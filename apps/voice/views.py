from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from django.http import Http404

from apps.narrations.models import Narration
from .serializers import VoiceItemSerializer

# Create your views here.
class CategorySearch(APIView):
    def post(self, request, *args, **kwargs):
        voice_input = request.data.get('voice_input')
        if not voice_input:
            return Response({'error': 'No voice input'}, status=status.HTTP_400_BAD_REQUEST)

        if self.kwargs.get('platform') not in ['alexa', 'google', 'bixby']:
            return Response({'error': 'Unsupported voice platform'}, status=status.HTTP_400_BAD_REQUEST)

        search_vectors = SearchVector('categories__name', weight='A', config='english')
        search_query = SearchQuery(voice_input, config='english')
        search_rank = SearchRank(search_vectors, search_query)

        narrs = Narration.objects.filter(library=True).annotate(search=search_vectors).filter(search=search_query).annotate(rank=search_rank).distinct('id', 'rank').order_by('-rank', 'id')

        if narrs:
            return Response(VoiceItemSerializer(narrs, many=True, context={'platform': self.kwargs.get('platform')}).data)
        else:
            raise Http404('No narrations found')

class CustomerSearch(APIView):
    def post(self,request, *args, **kwargs):
        voice_input = request.data.get('voice_input')
        if not voice_input:
            return Response({'error': 'No voice input'}, status=status.HTTP_400_BAD_REQUEST)

        if self.kwargs.get('platform') not in ['alexa', 'google', 'bixby']:
            return Response({'error': 'Unsupported voice platform'}, status=status.HTTP_400_BAD_REQUEST)

        # full text search stemming doesnt work with companies like GoTime or BlazeMeter
        # so we're stuck doing this really stupid look-up table

        search_vectors = SearchVector('customer__voicename__name', weight='A', config='english')
        search_query = SearchQuery(voice_input, config='english')
        search_rank = SearchRank(search_vectors, search_query)

        narrs = Narration.objects.filter(library=True).annotate(search=search_vectors).filter(search=search_query).annotate(rank=search_rank).distinct('id', 'rank').order_by('-rank', 'id')

        if narrs:
            return Response(VoiceItemSerializer(narrs, many=True, context={'platform': self.kwargs.get('platform')}).data)
        else:
            raise Http404('No narrations found')

class TitleSearch(APIView):
    def post(self, request, *args, **kwargs):
        voice_input = request.data.get('voice_input')
        if not voice_input:
            return Response({'error': 'No voice input'}, status=status.HTTP_400_BAD_REQUEST)

        if self.kwargs.get('platform') not in ['alexa', 'google', 'bixby']:
            return Response({'error': 'Unsupported voice platform'}, status=status.HTTP_400_BAD_REQUEST)

        # hitting max btree size when trying to B-tree GIN index content
        search_vectors = (SearchVector('title', weight='A', config='english') + SearchVector('content', weight='B', config='english'))
        #search_vectors = SearchVector('title', weight='A', config='english')
        search_query = SearchQuery(voice_input, config='english')
        search_rank = SearchRank(search_vectors, search_query)

        narrs = Narration.objects.filter(library=True).annotate(search=search_vectors).filter(search=search_query).annotate(rank=search_rank).distinct('id', 'rank').order_by('-rank', 'id')

        if narrs:
            return Response(VoiceItemSerializer(narrs, many=True, context={'platform': self.kwargs.get('platform')}).data)
        else:
            raise Http404('No narrations found')

class GenericSearch(APIView):
    def post(self, request, *args, **kwargs):
        voice_input = request.data.get('voice_input')
        if not voice_input:
            return Response({'error': 'No voice input'}, status=status.HTTP_400_BAD_REQUEST)

        if self.kwargs.get('platform') not in ['alexa', 'google', 'bixby']:
            return Response({'error': 'Unsupported voice platform'}, status=status.HTTP_400_BAD_REQUEST)

        # as stated above the customer name is most likely not going to match on anything

        search_vectors = (SearchVector('title', weight='A', config='english') + SearchVector('customer__voicename__name', weight='B', config='english') + SearchVector('categories__name', weight='C', config='english') + SearchVector('content', weight='D', config='english'))
        search_query = SearchQuery(voice_input, config='english')
        search_rank = SearchRank(search_vectors, search_query)

        narrs = Narration.objects.filter(library=True).annotate(search=search_vectors).filter(search=search_query).annotate(rank=search_rank).distinct('id', 'rank').order_by('-rank', 'id')

        if narrs:
            return Response(VoiceItemSerializer(narrs, many=True, context={'platform': self.kwargs.get('platform')}).data)
        else:
            raise Http404('No narrations found')