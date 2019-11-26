from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import Http404
from django.utils.decorators import method_decorator
from django.views.decorators.clickjacking import xframe_options_exempt
import urllib
import re

from apps.narrations.models import Narration
# Create your views here.

def oembed_request(request):
    if 'format' in request.GET and request.GET['format'] == 'xml':
        raise HttpResponse("XML Not Implemented, please use JSON", status_code=501)

    customer_name = None
    slug = None

    if 'url' in request.GET and request.GET['url']:
        url = request.GET['url']

        parsed_url = urllib.parse.urlparse(urllib.parse.unquote(url))
        if parsed_url.netloc == "article.voxsnap.com":
            pattern = re.compile(r'^/(?P<company_name>[-\w]+)/(?P<slug>.*)$')
            matches = pattern.match(parsed_url.path)
            if matches:
                try:
                    found = Narration.objects.get(customer__short_name=matches.groups()[0], slug=matches.groups()[1])
                    customer_name=found.customer.short_name
                    slug=found.slug
                except Narration.DoesNotExist:
                    raise Http404('Narration not found')
            else:
                raise Http404('Please use narrations full url')
        else:
            raise Http404('Only VoxSnap narrations supported')

        width = 700
        if 'maxwidth' in request.GET and request.GET['maxwidth']:
            test_width = int(request.GET['maxwidth'])
            if test_width < 290:
                width = 290
            elif test_width > 1280:
                width = 1280
            else:
                width = test_width

        html_blob = "<iframe height=\"157\" width=\"{}\" frameborder=\"0\" scrolling=\"no\" src=\"https://player.voxsnap.com/oembed/{}/{}\"></iframe>".format(width, customer_name, slug)

        response = {
            'version': 1.0,
            'type': 'rich',
            'height': 250, #embedly does aspect ratios
            #'height': 132,
            'width': width,
            'provider_name': 'VoxSnap',
            'provider_url': 'https://voxsnap.com',
            'cache_age': 3600,
            #'cache': 86400,
            'html': html_blob
        }
        json = JsonResponse(response)
        json['Access-Control-Allow-Origin'] = "*"
        return json
    else:
        raise Http404("No url specified")

@method_decorator(xframe_options_exempt, name='dispatch')
class OEmbed(TemplateView):
    template_name = 'embedded/oembed.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['narration'] = Narration.objects.filter(customer__short_name=self.kwargs['company_name'], slug=self.kwargs['slug']).get()
            return context
        except:
            raise Http404('Narration not found')

@method_decorator(xframe_options_exempt, name='dispatch')
class TwitterEmbed(TemplateView):
    template_name = 'embedded/twitter_card.html'
  
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['narration'] = Narration.objects.filter(customer__short_name=self.kwargs['company_name'], slug=self.kwargs['slug']).get()
            return context
        except:
            raise Http404('Narration not found')