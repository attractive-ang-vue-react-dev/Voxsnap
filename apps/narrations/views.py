from django.core.exceptions import ValidationError
from django.db import models
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.narrations.serializers import PlaylistRetrieveSerializer
from voxsnap.utils.narrations import calculate_article_word_count

from ..models import Narration, Narrator, Playlist
from ..serializers import (NarrationSerializer, NarrationUpdateSerializer,
                           NarratorPublicSerializer, PlaylistListSerializer,
                           PlaylistSerializer)


class NarratorsListView(ListAPIView):
    queryset = Narrator.objects.filter(enabled=True)
    serializer_class = NarratorPublicSerializer


class NarrationsListView(ListAPIView):
    queryset = Narration.objects.all()
    serializer_class = NarrationSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        qs = super().get_queryset().filter(order__user=self.request.user)

        query_param = self.request.query_params.get('q')
        status_param = self.request.query_params.get('status')

        if query_param:
            qs = qs.filter(
                (models.Q(narrator__first_name__icontains=query_param)
                 | models.Q(narrator__last_name__icontains=query_param)
                 | models.Q(url__icontains=query_param)))

        if status_param:
            qs = qs.filter(status__exact=status_param)

        return qs


class NarrationDetailsView(RetrieveUpdateAPIView):
    queryset = Narration.objects.all()
    serializer_class = NarrationSerializer

    def get_queryset(self):
        return super().get_queryset()\
            .filter(order__user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return NarrationUpdateSerializer
        return self.serializer_class


class UrlWordCountView(APIView):
    def post(self, request):
        url = request.data.get('url')
        try:
            word_count = calculate_article_word_count(url)
        except ValidationError:
            content = {'error': 'Could not find article'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            text_len = word_count
            return Response({'wordcount': text_len})


class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    queryset = Playlist.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return PlaylistListSerializer
        if self.action == 'retrieve':
            return PlaylistRetrieveSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        qs = super().get_queryset().filter(user=self.request.user)
        query_param = self.request.query_params.get('q')

        if query_param:
            qs = qs.filter(name__icontains=query_param)
        return qs
