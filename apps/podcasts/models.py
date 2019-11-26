from django.db import models
from apps.uploader.models import FileItem
from apps.users.models import Customer

# Create your models here.
class PodcastCategory(models.Model):
    name = models.CharField(max_length=100)
    feed_output = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.DO_NOTHING, blank=True, null=True, related_name="parents")

    def __str__(self):
        return self.name

class PodcastFeed(models.Model):
    feed_slug = models.CharField(max_length=120)
    title = models.CharField(max_length=120)
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    category_top = models.ForeignKey(PodcastCategory, on_delete=models.DO_NOTHING, related_name="top_category", limit_choices_to={'parent': None})  #does this make sense or do I need False
    category_detailed = models.ForeignKey(PodcastCategory, on_delete=models.DO_NOTHING, related_name="detailed_category", limit_choices_to={'parent': True})
    description = models.CharField(max_length=500, blank=True, null=True)
    image = models.ImageField()

class PodcastEpisode(models.Model):
    feed = models.ForeignKey(PodcastFeed, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500, blank=True, null=True)
    episode_notes = models.CharField(max_length=500, blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    audio_file = models.ForeignKey(FileItem, blank=True, null=True, on_delete=models.PROTECT)
    publish_date = models.DateTimeField(blank=True, null=True)