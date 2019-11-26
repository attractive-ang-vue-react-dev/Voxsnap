from collections import OrderedDict
from django.conf import settings
from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic import DetailView, TemplateView
from rest_framework import pagination
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from apps.narrations.models import Category, Narration, Playlist
from apps.users.models import Customer

from .serializers import (ItemLibrarySerializer, LibrarySerializer,
                          PlaylistSerializer, SubcategorySerializer)


def player(request, company_name=None, pk=None, js_file='voxsnap.js'):
    if request.method == "OPTIONS":
        return HttpResponse()

    if company_name:
        get_object_or_404(Customer, short_name=company_name)
    elif pk:
        get_object_or_404(Narration, pk=pk)

    response = HttpResponse(content_type='application/javascript')
    response['X-Accel-Redirect'] = f'/accelerated/{js_file}'
    response['Cache-Control'] = 'public, max-age=86400'
    response['Access-Control-Allow-Origin'] = '*'

    return response


class WaveformView(TemplateView):
    templates = ["wave/wave.json"]
    content_type = 'application/javascript'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['wave'] = WaveJson.objects.exclude(wave__isnull=True).exclude(wave__exact='').filter(narration=self.kwargs['pk'])
        return context


    # WaveJson is not defined
    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context['wave'] = (WaveJson.objects.exclude(wave__isnull=True)
    #     .exclude(wave__exact='').filter(narration=self.kwargs['pk']))
    #     return context

    # need to build middleware for CORS
    # context = {"wave": wave.wave}
    # templates = ["wave/wave.json"]
    # response = TemplateResponse(request, templates, context,
    # content_type="application/json")
    # response['Access-Control-Allow-Origin'] = "*"
    # return response


def make_custom_pagination(global_state, custom_page_size=settings.REST_FRAMEWORK['PAGE_SIZE']):
    class CustomPagination(pagination.PageNumberPagination):
        page_size = custom_page_size

        def get_paginated_response(self, data):
            return Response(
                OrderedDict([('count', self.page.paginator.count),
                             ('next', self.get_next_link()),
                             ('previous', self.get_previous_link()),
                             ('results', data),
                             ('global_state', global_state)]))

    return CustomPagination


class ResetPaginatorMixin:
    def reset_paginator(self, cls):
        if hasattr(self, '_paginator'):
            self._paginator = None
        self.pagination_class = cls


class RetrieveGlobalDataMixin:
    def retrieve(self, request, *args, **kwargs):
        """Retrieve a model instance."""
        ctx = self.request.parser_context.get('kwargs', {})
        pk = ctx.get('pk')
        company_name = ctx.get('company_name')

        if not pk or not company_name:
            raise Http404('Need key and company name')

        cust_data = get_object_or_404(Customer, short_name=company_name)
        global_state = {'google_analytics': {}}

        if cust_data.google_analytics and cust_data.google_analytics_funcname:
            global_state['google_analytics'][
                'funcname'] = cust_data.google_analytics_funcname

        if cust_data.enterprise:
            global_state['enterprise'] = True

        if cust_data.compact_player:
            global_state['player_size'] = 'compact'

        if cust_data.brand_color:
            global_state['color'] = cust_data.brand_color

        instance = self.get_object()
        serializer = self.get_serializer(instance)

        if hasattr(serializer, 'data_with_extra'):
            return Response(serializer.data_with_extra(global_state))

        return Response(serializer.data)


class ItemLibraryView(RetrieveGlobalDataMixin, RetrieveAPIView):
    queryset = Narration.objects.select_related()
    serializer_class = ItemLibrarySerializer

    def get_queryset(self):
        ctx = self.request.parser_context.get('kwargs', {})
        pk = ctx.get('pk')
        company_name = ctx.get('company_name')

        if not pk or not company_name:
            raise Http404('Need key and customer name')

        return super().get_queryset().filter(customer__short_name=company_name,
                                             pk=pk)


class LibraryView(ListAPIView, ResetPaginatorMixin):
    queryset = Narration.objects.select_related()
    serializer_class = LibrarySerializer

    def head(self, request, *args, **kwargs):
        latest_narr = self.get_queryset().latest('publish_date')
        response = HttpResponse('')
        # RFC 1123 date format
        response['Last-Modified'] = latest_narr.publish_date.strftime(
            '%a, %d %b %Y %H:%M:%S GMT')
        return response

    def get_queryset(self):
        ctx = self.request.parser_context.get('kwargs', {})
        category = ctx.get('category')
        company_name = ctx.get('company_name')
        args = {'library': True}

        self.reset_paginator(make_custom_pagination({'googleAnalytics': {}}))

        if category:
            parent_cat = Category.objects.filter(slug=category)
            if not parent_cat:
                raise Http404('Could not find category')
            children = Category.objects.filter(parent=parent_cat[0])
            args['categories__in'] = parent_cat | children
        if company_name:
            args['customer__short_name'] = company_name
            args['audio_hub'] = True
            del args['library']
            # temp shitty hack to fix lack of pagination on audiohub pages
            self.reset_paginator(make_custom_pagination({'googleAnalytics': {}}, 100))

        try:
            return super().get_queryset().filter(**args)
        except IndexError:
            raise Http404('Could not find matching object')


class FeaturedLibraryView(LibraryView):
    def get_queryset(self):
        try:
            return super().get_queryset().filter(**{
                'library': True,
                'featured_library': True
            })
        except IndexError:
            raise Http404('Could not find matching object')


class PlaylistLibraryView(RetrieveGlobalDataMixin, RetrieveAPIView):
    queryset = Playlist.objects.select_related()
    serializer_class = PlaylistSerializer

    def get_queryset(self):
        ctx = self.request.parser_context.get('kwargs', {})
        pk = ctx.get('pk')
        company_name = ctx.get('company_name')

        if not pk or not company_name:
            raise Http404('Need key and company name')

        try:
            return super().get_queryset().filter(
                id=pk, customer__short_name=company_name)
        except IndexError:
            raise Http404('Could not find matching object')


class LibraryPageView(TemplateView):
    template_name = 'library.html'


class SubcategoryView(ListAPIView):
    queryset = Category.objects.filter(parent__isnull=False)
    serializer_class = SubcategorySerializer


class AudioHubView(DetailView):
    model = Customer
    slug_field = 'short_name'
    slug_url_kwarg = 'customer'
    template_name = 'audiohub.html'
    context_object_name = 'customer'

    queryset = Customer.objects.filter(audio_hub=True)