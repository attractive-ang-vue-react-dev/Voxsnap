from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView

from apps.narrations.models import Narration
from apps.users.models import Customer
from .models import PodcastCategory, PodcastEpisode, PodcastFeed


class PodcastFeed(TemplateView):
    templates = ['podcast/feed.rss']
    content_type = 'application/rss+xml'

    def head(self, *args, **kwargs):
        latest_podcast = self.get_queryset().latest('publish_date')
        response = HttpResponse('')
        # RFC 1123 date format
        response['Last-Modified'] = latest_podcast.publish_date.strftime('%a, %d %b %Y %H:%M:%S GMT')
        return response

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        customer = get_object_or_404(Customer, short_name=company_name)
        if customer.podcasts_enabled:
            podcasts =  customer.narration_set.published()
        else:
            raise Http404("No podcast available")



        context['narrations'] = PodcastFeed.objects.filter(customer=self.kwargs['customer_name'], feed=self.kwargs['feed'])
        return context

    def get_queryset(self):
        ctx = self.request.parser_context.get('kwargs', {})

        company_name = ctx.get('company_name')

        try:
            return PodcastEpisode.objects.filter(
                customer__short_name=company_name,
                category=category,
                public=True
            ).select_related()
        except IndexError:
            raise Http404('Could not find matching object')
