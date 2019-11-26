import datetime
import operator
import functools

from collections import OrderedDict, namedtuple

from typing import List

from django.utils import timezone
from django.db import models
from django.contrib.postgres.fields import ArrayField

from .utils import BaseEnum, get_expression


class EventType(BaseEnum):
    ALL = 'gross_events'
    PLAYS = 'gross_play'

    PLAY = 'play'
    PODCAST_PLAY = 'podcastplay'
    ALEXA_PLAY = 'alexaplay'

    ALEXA_PLAY_NEXT = 'alexaplaynext'
    ALEXA_PLAY_PREVIOUS = 'alexaplayprev'
    ALEXA_RESUME = 'alexaresume'

    ALEXA_PAUSE = 'alexapause'
    PAUSE = 'pause'

    SKIP_FORWARDS = 'skip_forwards'
    SKIP_BACKWARDS = 'skip_backwards'
    SEEK = 'seek'

    ENDED = 'session_end'
    SHARE = 'share'

    def get_data_set(self):
        return f"{self.value}_set"

    def __get_query(self, data_set=None, *args, **kwargs):
        if self == EventType.ALL:
            return models.Q()
        elif self == EventType.PLAYS:
            return models.Q(
                **{
                    get_expression(data_set, "event_type__in"): [
                        EventType.PLAY.value, EventType.PODCAST_PLAY.value,
                        EventType.ALEXA_PLAY.value
                    ]
                })
        else:
            return models.Q(
                **{get_expression(data_set, "event_type"): self.value})

    def get_related_query(self, data_set=None, *args, **kwargs):
        return self.__get_query(data_set=self.get_data_set(), *args, **kwargs)

    def get_query(self, data_set=None, *args, **kwargs):
        return self.__get_query(data_set='', *args, **kwargs)

    @staticmethod
    def get_choices():
        return [(i.value, i.name) for i in EventType.get_all_types()]


TimeSpanRange = namedtuple('TimeSpanRange', ('date_from', 'date_to'))


class TimeSpan(BaseEnum):
    TODAY = "today"
    YESTERDAY = "yesterday"
    LAST_7_DAYS = "last_7_days"
    LAST_30_DAYS = "last_30_days"
    THIS_MONTH = "this_month"
    LAST_MONTH = "last_month"
    CUSTOM = "custom"

    @staticmethod
    def get_enum_dict(today=None):
        today = (today or datetime.datetime.combine(
            datetime.datetime.now(), datetime.datetime.min.time()))
        today = today.replace(tzinfo=None)

        this_month = today - datetime.timedelta(days=(today.day - 1))
        last_month = this_month - datetime.timedelta(days=30)

        return OrderedDict([
            (TimeSpan.TODAY, TimeSpanRange(today, today)),
            (TimeSpan.YESTERDAY,
             TimeSpanRange((today - datetime.timedelta(days=1)), today)),
            (TimeSpan.LAST_7_DAYS,
             TimeSpanRange((today - datetime.timedelta(days=7)), today)),
            (TimeSpan.LAST_30_DAYS,
             TimeSpanRange((today - datetime.timedelta(days=30)), today)),
            (TimeSpan.THIS_MONTH, TimeSpanRange(this_month, today)),
            (TimeSpan.LAST_MONTH, TimeSpanRange(last_month, this_month))
        ])

    @staticmethod
    def days_between(d1, d2):
        d1 = datetime.datetime.strptime(d1, "%Y-%m-%d")
        d2 = datetime.datetime.strptime(d2, "%Y-%m-%d")
        return abs((d2 - d1).days)

    def get_time_period(self):
        if self == TimeSpan.TODAY:
            return TimePeriod.MINUTE
        elif self == TimeSpan.YESTERDAY:
            return TimePeriod.HOUR
        elif self == TimeSpan.LAST_7_DAYS:
            return TimePeriod.HOUR
        elif self == TimeSpan.LAST_30_DAYS:
            return TimePeriod.DAY
        elif self == TimeSpan.THIS_MONTH:
            return TimePeriod.DAY
        elif self == TimeSpan.LAST_MONTH:
            return TimePeriod.DAY
        elif self == TimeSpan.CUSTOM:
            start, end = self.get_custom_timespan_range()
            days = self.days_between(start, end)

            if days <= 1:
                return TimePeriod.MINUTE
            elif days <= 2:
                return TimePeriod.HOUR
            elif days <= 7:
                return TimePeriod.HOUR
            elif days <= 60:
                return TimePeriod.DAY
            elif self <= 180:
                return TimePeriod.DAY
            elif self <= 360:
                return TimePeriod.QUARTER
            elif self > 360:
                return TimePeriod.MONTH

    @classmethod
    def get_time_dict(cls, today=None):
        return OrderedDict([(time_span.value, time_span_range)
                            for (time_span,
                                 time_span_range) in TimeSpan.get_enum_dict(
                                     today=today).items()])

    def get_timespan(self):
        if self == TimeSpan.CUSTOM:
            trange = self.get_custom_timespan_range()
            if trange:
                return trange

        return TimeSpan.get_enum_dict()[self]

    def has_custom_timespan_range(self):
        return hasattr(self, '__custom_timespan_range')

    def get_custom_timespan_range(self):
        if self.has_custom_timespan_range():
            return self.__custom_timespan

    def set_custom_timespan_range(self, date_from, date_to):
        pdate = lambda date: datetime.datetime.strptime(date, '%Y-%m-%d')

        date_from = pdate(date_from).replace(tzinfo=None)
        date_to = pdate(date_to).replace(tzinfo=None)

        self.__custom_timespan = TimeSpanRange(date_from, date_to)

    def get_query(self):
        time_span_range = None

        if self == TimeSpan.CUSTOM:
            if self.has_custom_timespan_range():
                time_span_range = self.get_custom_timespan()
        else:
            time_span_range = TimeSpan.get_enum_dict()[self]

        q = models.Q()

        if time_span_range is not None:
            q &= models.Q(event_time__gte=time_span_range.date_from)
            q &= models.Q(event_time__lt=time_span_range.date_to)

        return q


class TimePeriod(BaseEnum):
    SECOND = "second"
    MINUTE = "minute"
    HOUR = "hour"
    DAY = "day"
    WEEK = "month"
    MONTH = "month"
    QUARTER = "quarter"
    YEAR = "year"

    def get_time_trunc(self, data_set='play', field='event_time'):
        key = get_expression(data_set, self.value, separator='_')

        return {key: models.functions.Trunc(field, self.get_value())}


class DeviceType(BaseEnum):
    MOBILE = 'mobile'
    DESKTOP = 'desktop'
    TABLET = 'tablet'
    OTHER = 'other'

    def get_data_set(self):
        return EventType.PLAYS.get_data_set()

    def get_query(self, data_set=None, *args, **kwargs):
        mobile = [
            'Android', 'BlackBerry OS', 'Firefox OS', 'Maemo', 'Symbian OS',
            'Tizen', 'Windows Phone', 'iOS'
        ]
        desktop = [
            'Linux', 'Fedora', 'Mac OS X', 'FreeBSD', 'NetBSD', 'OpenBSD',
            'Solaris', 'Ubuntu', 'Windows'
        ]
        tablet = ['Chrome OS']
        other = ['', None, 'null', 'NULL', 'other', 'Other']

        return {
            DeviceType.DESKTOP:
            models.Q(**{get_expression(data_set, "os__in"): desktop}),
            DeviceType.MOBILE:
            models.Q(**{get_expression(data_set, "os__in"): mobile}),
            DeviceType.TABLET:
            models.Q(**{get_expression(data_set, "os__in"): tablet}),
            DeviceType.OTHER:
            (models.Q(**{get_expression(data_set, "os__isnull"): True})
             | models.Q(**{get_expression(data_set, "os__in"): other}))
        }[self]

    def get_colour(self):
        return {
            DeviceType.MOBILE: '#a7425b',
            DeviceType.DESKTOP: '#ff5d86',
            DeviceType.TABLET: '#6e4e4e',
            DeviceType.OTHER: '#c1a0a8'
        }[self]


class ShareType(BaseEnum):
    EMBED = 'embed'
    FACEBOOK = 'facebook'
    LINKEDIN = 'linkedin'
    MAIL = 'main'
    TWITTER = 'twitter'
    URL = 'url'
    OTHER = 'other'

    def get_data_set(self):
        return EventType.SHARE.get_data_set()

    @classmethod
    def get_field_name(cls):
        return "link_share_type"

    def get_query(self, data_set=None, *args, **kwargs):
        if self == ShareType.OTHER:
            return (models.Q(
                **{get_expression(data_set, "share_type__isnull"): True})
                    | models.Q(
                        **{
                            get_expression(data_set, "share_type__in"):
                            ['NULL', 'null', None, '']
                        }))
        else:
            return models.Q(
                **{get_expression(data_set, "share_type"): self.value})

    def get_colour(self):
        return {
            ShareType.EMBED: '#a7425b',
            ShareType.FACEBOOK: '#ff5d86',
            ShareType.LINKEDIN: '#6e4e4e',
            ShareType.MAIL: '#c1a0a8',
            ShareType.TWITTER: '#ffbccd',
            ShareType.URL: '#ff00ee',
            ShareType.OTHER: '#dec0ee'
        }[self]


class PlayerType(BaseEnum):
    EMBEDDABLE = 'embeddable'
    LIBRARY = 'library'
    PODCAST = 'podcast'
    SMART_SPEAKER = 'smart_speaker'

    def get_data_set(self):
        return EventType.PLAYS.get_data_set()

    def get_query(self, data_set=None, *args, **kwargs):
        def get_map():
            event_type_expression = get_expression(data_set, "event_type")
            library_type_isnull_expression = get_expression(
                data_set, "library_type__isnull")

            return {
                PlayerType.SMART_SPEAKER:
                models.Q(
                    **{event_type_expression: EventType.ALEXA_PLAY.value}),
                PlayerType.PODCAST:
                models.Q(
                    **{event_type_expression: EventType.PODCAST_PLAY.value}),
                PlayerType.EMBEDDABLE:
                models.Q(
                    **{
                        event_type_expression: EventType.PLAY.value,
                        library_type_isnull_expression: True
                    }),
                PlayerType.LIBRARY:
                models.Q(
                    **{
                        event_type_expression: EventType.PLAY.value,
                        library_type_isnull_expression: False
                    })
            }

        return get_map()[self]

    def get_colour(self):
        return {
            PlayerType.SMART_SPEAKER: '#a7425b',
            PlayerType.PODCAST: '#ff5d86',
            PlayerType.EMBEDDABLE: '#6e4e4e',
            PlayerType.LIBRARY: '#c1a0a8'
        }[self]


#------------------ Querysets


class AnalyticsEventsQueryset(models.QuerySet):
    @staticmethod
    def get_query_map():
        return dict(
            AnalyticsEventsGlobalPlay=EventType.PLAYS.get_query(),
            AnalyticsEventsPlay=EventType.PLAY.get_query(),
            AnalyticsEventsPodcastPlay=EventType.PODCAST_PLAY.get_query(),
            AnalyticsEventsAlexaPlay=EventType.ALEXA_PLAY.get_query(),
            AnalyticsEventsAlexaPlayNext=EventType.ALEXA_PLAY_NEXT.get_query(),
            AnalyticsEventsAlexaPlayPrevious=EventType.ALEXA_PLAY_PREVIOUS.
            get_query(),
            AnalyticsEventsAlexaPause=EventType.ALEXA_PAUSE.get_query(),
            AnalyticsEventsAlexaResume=EventType.ALEXA_RESUME.get_query(),
            AnalyticsEventsPause=EventType.PAUSE.get_query(),
            AnalyticsEventsEnded=EventType.ENDED.get_query(),
            AnalyticsEventsShare=EventType.SHARE.get_query(),
            AnalyticsEventsSkipForwards=EventType.SKIP_FORWARDS.get_query(),
            AnalyticsEventsSkipBackwards=EventType.SKIP_BACKWARDS.get_query(),
            AnalyticsEventsSeek=EventType.SEEK.get_query())

    def get_events(self,
                   customer=None,
                   event_type=None,
                   date_from=None,
                   date_to=None):
        events = self

        if customer is not None:
            events = events.filter(customer=customer)

        events = events.order_by('event_time')

        if event_type is not None:
            events = events.filter(event_type=event_type)

        if date_from is not None:
            events = events.filter(event_time__gte=date_from)

        if date_to is not None:
            events = events.filter(event_time__lt=date_to)

        return events

    def shares(self):
        return self.filter(EventType.SHARE.get_query(data_set=None))

    def plays(self):
        return self.filter(EventType.PLAYS.get_query(data_set=None))

    def get_events_by_player_type(self, data_set=EventType.ALL.get_data_set()):
        return self\
            .plays()\
            .set_player_type(data_set=data_set)\
            .values('player_type')\
            .annotate(no_of_plays=models.Count('player_type'))

    def get_plays_by_geography(self, level='city'):
        qs = self\
            .plays()

        if level in ('city', 'state', 'country'):
            if level == 'city':
                q = models.Q(location_city__isnull=False,
                             location_country__isnull=False,
                             location_state__isnull=False)
            elif level == 'country':
                q = models.Q(location_country__isnull=False)

            elif level == 'state':
                q = models.Q(location_country__isnull=False,
                             location_state__isnull=False)

            qs = qs\
                .filter(q)\
                .values('location_city', 'location_country', 'location_state')\
                .annotate(no_of_plays=models.Count(f'location_{level}'))\
                .order_by('-no_of_plays')

        return qs

    def get_plays_by_geography_pin(self):
        qs = self\
            .plays()

        qs = qs\
                .filter(models.Q(pin__isnull=False))\
                .values('location_city', 'location_country', 'location_state', 'pin')

        return qs

    def get_plays_by_country(self):
        return self\
            .plays()\
            .filter(location_country__isnull=False)\
            .values('location_country')\
            .annotate(no_of_plays=models.Count('*'))\
            .distinct()\
            .order_by('location_country')

    def set_player_type(self, data_set=None):
        return self\
            .plays()\
            .annotate(player_type=PlayerType.get_group_by_cases(data_set=data_set))

    def set_time_period(self, time_period):
        return self.annotate(**time_period.get_time_trunc())

    def get_play_count_by_type_by_time_period(
            self,
            item_type: BaseEnum,
            filter_item_types: List[BaseEnum],
            time_span=None,
            time_period=TimePeriod.DAY,
            output_field=None,
            *args,
            **kwargs):
        qs = self.plays()

        if time_period is not None:
            qs = qs.set_time_period(time_period)

        if time_span is not None:
            qs = qs.filter(time_period.get_query())

        if output_field is None:
            output_field = f"play_{time_period.value}"
            qs = qs.values(output_field)

        qs = qs\
            .annotate(**(
                item_type.get_sum_group_by_types(data_set='', item_types=filter_item_types)
            ))

        if output_field is not None:
            qs = qs.order_by(f"-{output_field}")

        return qs

    def get_play_count_by_type(self,
                               item_type: BaseEnum,
                               filter_item_types: List[BaseEnum],
                               time_span=None,
                               time_period=TimePeriod.DAY,
                               *args,
                               **kwargs):
        qs = self

        if time_period is not None:
            qs = qs.set_time_period(time_period)

        if time_span is not None:
            qs = qs.filter(time_span.get_query())

        return qs\
            .__set_item_types(item_type, filter_item_types)\
            .values(item_type.get_field_name())\
            .distinct()\
            .annotate(no_of_plays=models.Count('*'))\
            .order_by("-no_of_plays")

    def get_play_count_by_device_type(self):
        return self\
            .filter(os__isnull=False)\
            .get_play_count_by_type(DeviceType, DeviceType.get_all_types())

    def get_most_popular_device(self):
        return self\
            .get_play_count_by_device_type()[0]

    def __set_item_types(self, item_type: BaseEnum,
                         filter_item_types: List[BaseEnum]):
        return self\
            .plays()\
            .annotate(**{
                item_type.get_field_name(): item_type.get_group_by_cases(item_types=filter_item_types)
            })

    def set_device_types(self):
        return self.__set_item_types(DeviceType)


class AnalyticsEventsShareQueryset(AnalyticsEventsQueryset):
    def get_share_medium_by_share_count(self, data_set=None):
        return self\
            .set_share_medium(data_set=data_set)\
            .exclude(share_type='Other')\
            .values('share_medium')\
            .distinct()\
            .annotate(no_of_shares=models.Count('share_medium'))

    def get_share_type_by_count(self):
        return self\
            .shares()\
            .get_share_types()\
            .annotate(no_of_shares=models.Count('share_type'))

    def get_most_popular_share_network(self):
        return self\
            .shares()\
            .get_share_medium_by_share_count()\
            .exclude(share_type='Other')\
            .order_by('-no_of_shares')[0]

    def set_share_medium(self, data_set=EventType.SHARE.get_data_set()):
        return self\
            .annotate(
                share_medium=(
                    models.Case(
                        models.When(
                            ShareType.OTHER.get_query(data_set=data_set),
                            then=models.Value("Other")),
                        default=models.F(get_expression(data_set, 'share_type')),
                        output_field=models.CharField())))\

    def get_share_types(self, data_set=None):
        return self\
            .shares()\
            .set_share_medium(data_set=data_set)\
            .values('share_medium')\
            .distinct()\
            .order_by('share_medium')


class AnalyticsPlaySessionQueryset(AnalyticsEventsQueryset):
    def get_valid_sessions(self):
        return self.filter(session_id__isnull=False)

    def get_no_of_listeners(self):
        return self\
            .get_valid_sessions()\
            .aggregate(no_of_listeners=models.Count('session_id', distinct=True))

    def grand_total_play_time(self):
        return self\
            .get_valid_sessions()\
            .aggregate(grand_tot_play_time=(models.Sum('tot_play_time') / models.Value('100')))


class AnalyticsEventsGlobalPlayQuerySet(AnalyticsEventsQueryset):
    pass


class AnalyticsNarrationQuerySet(models.QuerySet):
    def _get_narrations(self,
                        customer=None,
                        date_from=None,
                        date_to=None,
                        data_set=None):
        narrations = self

        if date_from is not None:
            narrations = narrations.filter(
                **{get_expression(data_set, "event_time__gte"): date_from})

        if date_to is not None:
            narrations = narrations.filter(
                **{get_expression(data_set, "event_time__lt"): date_to})

        if customer is not None:
            narrations = narrations.filter(customer=customer)

        return narrations

    def get_narration_shares(self, customer=None, date_from=None,
                             date_to=None):
        return self\
            ._get_narrations(customer=customer, date_from=date_from, date_to=date_to)

    def get_narrations(self, customer=None, date_from=None, date_to=None):
        return self\
            ._get_narrations(customer=customer, date_from=date_from, date_to=date_to)

    def get_narration_plays(self, customer=None, date_from=None, date_to=None):
        return self\
            ._get_narrations(customer=customer, date_from=date_from, date_to=date_to)

    def plays(self):
        return self\
            .filter(EventType.PLAYS.get_related_query())\

    def get_narration_by_type(self, item_type, filter_item_types):
        qs = self.values('id', 'title', 'blog_url')

        if filter_item_types:
            qs = qs\
                .annotate(
                    **item_type.get_sum_group_by_types(
                        item_types=filter_item_types))\
                .order_by('-total_count')

        return qs


#------------------ Managers


class AnalyticsEventsManager(models.Manager):
    def get_queryset(self):
        qs = AnalyticsEventsQueryset(self.model, using=self._db)

        try:
            qs = qs.filter(
                AnalyticsEventsQueryset.get_query_map()[self.model.__name__])
        except KeyError as err:
            pass

        return qs

    def get_events(self, *args, **kwargs):
        return self\
            .get_queryset()\
            .get_events(*args, **kwargs)


class AnalyticsPlaySessionManager(AnalyticsEventsManager):
    def get_queryset(self):
        return AnalyticsPlaySessionQueryset(self.model, using=self._db)

    def get_valid_sessions(self):
        return self.get_queryset().get_valid_sessions()

    def grand_total_play_time(self):
        return self.get_queryset().grand_total_play_time()

    def get_device_type_by_count(self):
        return self.get_queryset().get_device_type_by_count()


class AnalyticsEventsShareManager(AnalyticsEventsManager):
    def get_queryset(self):
        return AnalyticsEventsShareQueryset(self.model, using=self._db)

    def get_share_types(self):
        return self.get_queryset().get_share_types()


class AnalyticsEventsGlobalPlayManager(AnalyticsEventsManager):
    def get_queryset(self):
        return AnalyticsEventsGlobalPlayQuerySet(self.model, using=self._db)


class AnalyticsNarrationManager(models.Manager):
    def get_queryset(self):
        return AnalyticsNarrationQuerySet(self.model, using=self._db)

    def get_narrations(self, *args, **kwargs):
        return self\
            .get_queryset()\
            .get_narrations(*args, **kwargs)

    def get_narration_shares(self, *args, **kwargs):
        return self\
            .get_queryset()\
            .get_narration_shares(*args, **kwargs)

    def get_narration_plays(self, *args, **kwargs):
        return self\
            .get_queryset()\
            .get_narration_plays(*args, **kwargs)
