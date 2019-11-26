from datetime import datetime

from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.functional import cached_property

from .querysets import *


class BaseAnalyticsEvents(models.Model):
    id = models.CharField(max_length=200, primary_key=True, db_column='_id')

    event_type = models.CharField(max_length=64,
                                  choices=EventType.get_choices())
    customer_short_name = models.CharField(null=True,
                                           max_length=100,
                                           db_column='customer')

    session_id = models.CharField(max_length=255, blank=True, null=True)
    referrer = models.CharField(max_length=2083, blank=True, null=True)
    browser = models.CharField(max_length=64, blank=True, null=True)
    device = models.CharField(max_length=64, blank=True, null=True)
    os = models.CharField(max_length=64, blank=True, null=True)
    ip_addr = models.GenericIPAddressField(blank=True, null=True)
    build_num = models.IntegerField(blank=True, null=True)

    location = models.CharField(max_length=128, blank=True, null=True)

    location_city = models.CharField(max_length=128, blank=True, null=True)
    location_state = models.CharField(max_length=128, blank=True, null=True)
    location_country = models.CharField(max_length=128, blank=True, null=True)

    pin = ArrayField(models.IntegerField())

    playlist = models.IntegerField(blank=True, null=True)
    play_ranges = ArrayField(models.IntegerField())
    library_type = models.CharField(max_length=64, blank=True, null=True)
    library_genre = models.CharField(max_length=128, blank=True, null=True)

    delta_time = models.DurationField(blank=True, null=True)
    event_time = models.DateTimeField()

    class Meta:
        abstract = True
        managed = False


#----------------- Read Only Models -----------------------


class AnalyticsEvents(BaseAnalyticsEvents):
    narration = models.ForeignKey('AnalyticsNarration',
                                  models.DO_NOTHING,
                                  related_name=EventType.ALL.get_data_set(),
                                  db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
            related_name=f'customer_{EventType.ALL.get_data_set()}')

    share_type = models.CharField(max_length=200)

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsGlobalPlay(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    user_agent = models.CharField(max_length=200, blank=True, null=True)
    alexa_user = models.CharField(max_length=256, blank=True, null=True)

    narration = models.ForeignKey('AnalyticsNarration',
                                  models.DO_NOTHING,
                                  related_name=EventType.PLAYS.get_data_set(),
                                  db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.PLAYS.get_data_set()}')

    objects = AnalyticsEventsGlobalPlayManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsPlay(BaseAnalyticsEvents):
    audio_time = models.FloatField()

    narration = models.ForeignKey('AnalyticsNarration',
                                  models.DO_NOTHING,
                                  related_name=EventType.PLAY.get_data_set(),
                                  db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.PLAY.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsPodcastPlay(BaseAnalyticsEvents):
    """Podcasts dont have build_num since its a http stream player"""
    audio_time = models.FloatField()
    user_agent = models.CharField(max_length=200, blank=True, null=True)

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.PODCAST_PLAY.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.PODCAST_PLAY.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsAlexaPlay(BaseAnalyticsEvents):
    """Alexa doesnt have build_num since its a http stream player"""
    audio_time = models.FloatField()
    alexa_user = models.CharField(max_length=256, blank=True, null=True)

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.ALEXA_PLAY.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.ALEXA_PLAY.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsAlexaPlayNext(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    alexa_user = models.CharField(max_length=256, blank=True, null=True)

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.ALEXA_PLAY_NEXT.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.ALEXA_PLAY_NEXT.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsAlexaPlayPrevious(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    alexa_user = models.CharField(max_length=256, blank=True, null=True)

    objects = AnalyticsEventsManager()

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.ALEXA_PLAY_PREVIOUS.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.ALEXA_PLAY_PREVIOUS.get_data_set()}')

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsAlexaPause(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    alexa_user = models.CharField(max_length=256, blank=True, null=True)

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.ALEXA_PAUSE.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.ALEXA_PAUSE.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsAlexaResume(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    alexa_user = models.CharField(max_length=256, blank=True, null=True)

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.ALEXA_RESUME.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.ALEXA_RESUME.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsPause(BaseAnalyticsEvents):
    audio_time = models.FloatField()

    narration = models.ForeignKey('AnalyticsNarration',
                                  models.DO_NOTHING,
                                  related_name=EventType.PAUSE.get_data_set(),
                                  db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.PAUSE.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsEnded(BaseAnalyticsEvents):
    audio_time = models.FloatField()

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False

    @staticmethod
    def get_data_set():
        return EventType.ENDED


class AnalyticsEventsShare(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    share_type = models.CharField(max_length=200)

    narration = models.ForeignKey('AnalyticsNarration',
                                  models.DO_NOTHING,
                                  related_name=EventType.SHARE.get_data_set(),
                                  db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.SHARE.get_data_set()}')

    objects = AnalyticsEventsShareManager()

    class Meta:
        db_table = "events_2019"
        managed = False

    @classmethod
    def get_share_types(cls):
        return list(a['share_medium']
                    for a in AnalyticsEventsShare.objects.get_share_types())


class AnalyticsEventsSkipForwards(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    from_time = models.FloatField()

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.SKIP_FORWARDS.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.SKIP_FORWARDS.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsSkipBackwards(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    seek_from = models.FloatField()

    narration = models.ForeignKey(
        'AnalyticsNarration',
        models.DO_NOTHING,
        related_name=EventType.SKIP_BACKWARDS.get_data_set(),
        db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.SKIP_BACKWARDS.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsEventsSeek(BaseAnalyticsEvents):
    audio_time = models.FloatField()
    seek_from = models.FloatField()

    narration = models.ForeignKey('AnalyticsNarration',
                                  models.DO_NOTHING,
                                  related_name=EventType.SEEK.get_data_set(),
                                  db_column='narration')
    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name=f'customer_{EventType.SEEK.get_data_set()}')

    objects = AnalyticsEventsManager()

    class Meta:
        db_table = "events_2019"
        managed = False


class AnalyticsPlaySession(BaseAnalyticsEvents):
    audio_time = models.FloatField(blank=True, null=True)
    tot_play_time = models.IntegerField(blank=True, null=True)

    user_id = models.CharField(max_length=255, blank=True, null=True)

    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name='customer_play_session_set')

    objects = AnalyticsPlaySessionManager()

    class Meta:
        db_table = "events_session_2019"
        managed = False


class AnalyticsTimeUpdate(BaseAnalyticsEvents):
    audio_time = models.FloatField(blank=True, null=True)

    play_pct = models.FloatField(blank=True, null=True)
    tot_play_time = models.IntegerField(blank=True, null=True)

    user_id = models.CharField(max_length=255, blank=True, null=True)

    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING,
        related_name='customer_time_updates_set')

    narration = models.ForeignKey('AnalyticsNarration',
                                  models.DO_NOTHING,
                                  related_name='time_updates_set',
                                  db_column='narration')

    class Meta:
        db_table = "events_timeupdate_2019"
        managed = False


class AnalyticsError(models.Model):
    id = models.CharField(max_length=200, primary_key=True, db_column='_id')

    build_num = models.IntegerField(blank=True, null=True)
    referrer = models.CharField(max_length=2083, blank=True, null=True)
    browser = models.CharField(max_length=64, blank=True, null=True)
    user_agent = models.CharField(max_length=200, db_column='user-agent')
    device = models.CharField(max_length=64, blank=True, null=True)
    os = models.CharField(max_length=64, blank=True, null=True)
    ip_addr = models.GenericIPAddressField(blank=True, null=True)

    location_lat_long = ArrayField(models.IntegerField(), db_column='pin')
    location_city = models.CharField(max_length=128, blank=True, null=True)
    location_state = models.CharField(max_length=128, blank=True, null=True)
    location_country = models.CharField(max_length=128, blank=True, null=True)

    message = models.CharField(max_length=2000)
    fatal = models.BooleanField()

    event_time = models.DateTimeField()

    class Meta:
        db_table = "errors"
        managed = False


class AnalyticsNarration(models.Model):
    id = models.BigAutoField(primary_key=True)
    uuid = models.CharField(max_length=100)

    public_library = models.BooleanField(default=False)

    featured_image = models.CharField(max_length=100)
    gen_description = models.CharField(max_length=100)

    customer = models\
        .ForeignKey('AnalyticsCustomer', models.DO_NOTHING, related_name='narration_set')

    title = models.CharField(max_length=100)
    slug = models.SlugField()
    description = models.CharField(max_length=100)
    content = models.CharField(max_length=100)
    blog_url = models.URLField()
    short_url = models.URLField()

    in_sitemap = models.BooleanField()
    keywords_string = models.CharField(max_length=200)
    meta_title = models.CharField(max_length=100)

    narrator_id = models.IntegerField(null=True)
    audio_length = models.DurationField(null=True, blank=True)
    audio_url = models.URLField(db_index=True, null=True, blank=True)
    preferred_gender = models.CharField(max_length=200)

    site_id = models.IntegerField(null=True)
    status = models.IntegerField(null=True)
    notes = models.TextField(blank=True, null=True)

    publish_date = models.DateTimeField()
    expiry_date = models.DateTimeField()

    created = models.DateTimeField()
    updated = models.DateTimeField()

    objects = AnalyticsNarrationManager()

    class Meta:
        managed = False
        db_table = "narrations"


class AnalyticsCustomer(models.Model):
    id = models.BigAutoField(primary_key=True)
    short_name = models.CharField(max_length=100, unique=True)

    class Meta:
        managed = False
        db_table = "customers"


class AnalyticsCountry(models.Model):
    numeric = models.CharField(max_length=10, unique=True)

    name = models.CharField(max_length=150)
    official_name = models.CharField(max_length=150)

    alpha_2 = models.CharField(max_length=2)
    alpha_3 = models.CharField(max_length=3)

    class Meta:
        managed = False
        db_table = "countries"
