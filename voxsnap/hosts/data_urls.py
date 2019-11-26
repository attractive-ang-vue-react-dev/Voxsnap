from django.conf import settings
from django.views.generic.base import RedirectView, TemplateView
from django.urls import include, path, re_path
from django_hosts import patterns, host

from apps.player.views import (player as player_js_view, ItemLibraryView, LibraryView, FeaturedLibraryView, PlaylistLibraryView, SubcategoryView, WaveformView)
from apps.embedded.views import oembed_request
from apps.podcasts.views import PodcastFeed

urlpatterns = [
    # player JS
    path('player/v1/<slug:company_name>/<int:pk>/voxsnap.js', player_js_view),
    path('player/v1/<slug:company_name>/voxsnap.js', player_js_view),
    path('player/player.html', TemplateView.as_view(template_name='player/player.html')),

    # library
    path('library/v2/library.json', LibraryView.as_view()),
    path('library/v2/category/<slug:category>/library.json', LibraryView.as_view()),
    path('library/v2/customer/<slug:company_name>/library.json', LibraryView.as_view()),
    path('library/v2/featured.json', FeaturedLibraryView.as_view()),
    path('library/v2/categories.json', SubcategoryView.as_view()),
    path('library/v2/<slug:company_name>/<int:pk>/library.json', ItemLibraryView.as_view()),
    path('library/v2/<slug:company_name>/playlist/<int:pk>/library.json', PlaylistLibraryView.as_view()),

    #path('library/v1/library.json', views.library),
    #path('library.json', views.homepage_library),
    path('podcast/emcoutdoor.rss', TemplateView.as_view(template_name='podcast/emcoutdoor.rss', content_type='application/rss+xml')),
    path('podcast/gotime.rss', TemplateView.as_view(template_name='podcast/gotime.rss', content_type='application/rss+xml')),
    path('podcast/pandiahealth.rss', TemplateView.as_view(template_name='podcast/pandiahealth.rss', content_type='application/rss+xml')),
    path('podcast/thinkresults.rss', TemplateView.as_view(template_name='podcast/thinkresults.rss', content_type='application/rss+xml')),
    path('podcast/totheweb.rss', TemplateView.as_view(template_name='podcast/totheweb.rss', content_type='application/rss+xml')),
    path('podcast/ycombinator.rss', TemplateView.as_view(template_name='podcast/ycombinator.rss', content_type='application/rss+xml')),
    #path('podcast/<slug:company_name>.rss', PodcastFeed.as_view()),
    path('podcast/<slug:company_name>/<slug:feed>.rss', PodcastFeed.as_view()),
    path('oembed', oembed_request),
    #path('player/v1/<slug:company_name>/<int:pk>/voxsnap.js', views.player),
    #path('player/v1/<slug:company_name>/voxsnap.js', views.player),
    #path('voice/search/genre', VoiceSearch.as_view()),
    #path('voice/search/company', VoiceSearch.as_view()),
    #path('voice/events', views.alexa_analytics),
    path('waveform/<int:pk>)', WaveformView.as_view()),
    #path('fba/<slug:company_name>', views.fbanalytics),
    #path('order/wordcount', apps.sales.views.word_count),
    path('voice/', include('apps.voice.urls'))
]
