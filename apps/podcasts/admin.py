from django.contrib import admin

from .models import PodcastFeed, PodcastEpisode

# Register your models here.
admin.site.register(PodcastFeed)
admin.site.register(PodcastEpisode)