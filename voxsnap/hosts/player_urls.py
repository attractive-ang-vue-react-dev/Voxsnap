from django.views.generic.base import RedirectView
from django.urls import path

from apps.embedded.views import OEmbed, TwitterEmbed


urlpatterns = [
    path(r'', RedirectView.as_view(url='https://voxsnap.com/')),

    path('oembed/<slug:company_name>/<slug:slug>', OEmbed.as_view(), name="oembed_page"),
    path('twitter/<slug:company_name>/<slug:slug>', TwitterEmbed.as_view(), name="twitter_page"),
]
