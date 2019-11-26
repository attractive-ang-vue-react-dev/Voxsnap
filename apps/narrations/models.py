from django.conf import settings
from django.contrib.postgres import indexes
from django.contrib.postgres.search import SearchVectorField
from django.core.validators import validate_slug
from django.db import models
from django.utils.functional import cached_property
from django.utils.timezone import now
from django_hosts.resolvers import reverse
from ordered_model.models import OrderedModel
from easy_thumbnails.files import get_thumbnailer
from sentry_sdk import capture_exception
import os

from apps.users.models import Customer
from apps.uploader.models import FileItem
from voxsnap.utils.narrations import calculate_article_word_count

def customer_image_path(instance, filename):
    file_extension = os.path.splitext(filename)[1]
    return 'narration/{0}/{1}'.format(instance.customer.short_name, instance.slug + file_extension)


class Category(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField()
    parent = models.ManyToManyField('Category', blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = (models.functions.Lower('name'),)

class Narrator(models.Model):
    GENDER = (('M', 'Male'), ('F', 'Female'))

    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    email = models.EmailField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER)

    sample_url = models.URLField()
    languages = models.ManyToManyField('NarratorLanguage',
                                       related_name='narrators',
                                       blank=True)

    enabled = models.BooleanField(default=False)

    class Meta:
        ordering = ("first_name", "last_name")

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Narration(models.Model):
    STATUS = (
        ('S', 'Assigned'),  # new order
        ('Y', 'Accepted'),  # narrator accepted
        ('N', 'Rejected'),  # narrator rejected
        ('R', 'Review'),  # file uploaded waiting for review
        ('M', 'Modification Required'),  # problem with recording, needs update
        ('L', 'Approved'))  # live

    id = models.BigAutoField(primary_key=True)

    order = models.ForeignKey('sales.Order',
                              on_delete=models.CASCADE,
                              related_name='narrations')
    status = models.CharField(max_length=1,
                              choices=STATUS,
                              default='S',
                              db_index=True)

    url = models.URLField()
    title = models.CharField(db_index=True, max_length=500, null=True)
    slug = models.SlugField(max_length=2000,
                            validators=[validate_slug],
                            null=True)
    description = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, blank=True, null=True)
    publish_date = models.DateTimeField(blank=True, null=True)
    expiry_date = models.DateTimeField(blank=True, null=True)
    categories = models.ManyToManyField(Category)
    content = models.TextField(blank=True, null=True)
    customer = models.ForeignKey(Customer, models.DO_NOTHING)

    narrator = models.ForeignKey(Narrator,
                                 null=True,
                                 blank=True,
                                 on_delete=models.PROTECT)
    narrator_notes = models.TextField(blank=True, null=True)

    audio_file = models.ForeignKey(FileItem, blank=True, null=True, on_delete=models.PROTECT)
    #audio_length = models.DurationField(null=True, blank=True)
    audio_hub = models.BooleanField(default=True, db_index=True)
    library = models.BooleanField(default=True, db_index=True)
    featured_library = models.BooleanField(default=False, db_index=True)
    podcast = models.BooleanField(default=True, db_index=True)
    featured_image = models.ImageField(null=True,
                                       blank=True,
                                       max_length=255,
                                       verbose_name="Featured Image",
                                       upload_to=customer_image_path)

    customer_notes = models.TextField(blank=True, null=True)
    word_count = models.PositiveIntegerField(blank=True)
    search_vector = SearchVectorField(blank=True, null=True)

    class Meta:
        unique_together = (('customer', 'slug'), )
        ordering = ['-id']
        indexes = [indexes.GinIndex(fields=['search_vector'], name='title_index')]

    def __str__(self):
        return (f'{self.pk} url ({self.url}), status '
                f'({self.get_status_display()})')

    def save(self, *args, **kwargs):
        if not self.word_count and self.url:
            self.word_count = calculate_article_word_count(self.url)
        _now = now()
        self.updated = _now
        if not self.id:
            self.created = _now
        if self.publish_date is None:
            self.publish_date = _now
        super(Narration, self).save(*args, **kwargs)

    # if google analytics is enabled return {}
    # if they have a custom GA func name then return {"func_name": google_analytics_funcname}
    def google_analytics(self):
        if self.customer.google_analytics_funcname:
            return dict(funcname=self.customer.google_analytics_funcname)

    def get_absolute_url(self):
        return reverse('article_page_detail', kwargs={'company_name': self.customer.short_name, 'slug': self.slug}, host='article', scheme='https')

    def image(self):
        if not self.featured_image:
            return "https://cdn.voxsnap.com/media/uploads/narration/default.png"
        else:
            try:
                return get_thumbnailer(self.featured_image).get_thumbnail({'size': (295,160), 'crop': 'smart'}).url
            except Exception as e:
                # report the id and error to sentry
                capture_exception(e)
                return "https://cdn.voxsnap.com/media/uploads/narration/default.png"

    def get_main_category(self):
        cur_category = self.categories.first()
        maybe_parent = cur_category.parent.first()
        if maybe_parent:
            return maybe_parent.slug
        return cur_category.slug

    def get_main_category_name(self):
        cur_category = self.categories.first()
        maybe_parent = cur_category.parent.first()
        if maybe_parent:
            return maybe_parent.name
        return cur_category.name

    def get_sub_category(self):
        cat = self.categories.first()
        if not cat.parent.first():
            return None
        return cat.slug

    def get_sub_category_name(self):
        cat = self.categories.first()
        if not cat.parent.first():
            return None
        return cat.name

class NarratorLanguage(models.Model):
    language = models.CharField(max_length=255)

    def __str__(self):
        return self.language


class Playlist(models.Model):
    name = models.CharField(max_length=255)

    # replaced user with customer
    customer = models.ForeignKey(Customer, models.DO_NOTHING)
    playlist_url = models.URLField(blank=True, null=True)

    narrations = models.ManyToManyField(
        'Narration', through='PlaylistNarrationsThroughModel')

    created_dt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_dt', )

    def __str__(self):
        return self.name

    @cached_property
    def narrations_count(self):
        return self.narrations.count()

    # wtf do we have this?
    def google_analytics(self):
        if self.customer.google_analytics_funcname:
            return dict(funcname=self.customer.google_analytics_funcname)


class PlaylistNarrationsThroughModel(OrderedModel):
    order_with_respect_to = 'playlist'

    playlist = models.ForeignKey('Playlist',
                                 on_delete=models.CASCADE,
                                 related_name='narrations_data')
    narration = models.ForeignKey('Narration',
                                  on_delete=models.CASCADE,
                                  related_name='narrations_data')

    class Meta(OrderedModel.Meta):
        pass
