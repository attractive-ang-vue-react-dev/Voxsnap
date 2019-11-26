from collections import OrderedDict, defaultdict, namedtuple, Counter

from django.core.paginator import Paginator
from django.db import models

from .models import AnalyticsEvents, \
    AnalyticsEventsPlay, AnalyticsEventsShare, \
    AnalyticsPlaySession, EventType, PlayerType, \
    DeviceType, AnalyticsNarration, AnalyticsCustomer,\
    AnalyticsEventsGlobalPlay, ShareType, TimePeriod, TimeSpan

from decimal import Decimal as D
from .utils import *


def get_customer(customer_id=None, customer_short_name=None):
    return AnalyticsCustomer.objects\
        .get(
            models.Q(id=customer_id) |
            models.Q(short_name=customer_short_name))


#----------------- Gross Stats


def get_no_of_listeners(customer=None):
    play_sessions = AnalyticsPlaySession.objects\
        .get_events(customer=customer)\
        .get_no_of_listeners()

    try:
        return play_sessions\
            .get('no_of_listeners', 0)
    except AttributeError:
        return D('0.0')


def get_total_listen_time(customer=None):
    play_sessions = AnalyticsPlaySession.objects\
        .get_events(customer=customer)

    grand_tot_play_time = play_sessions\
        .grand_total_play_time()

    try:
        return int(grand_tot_play_time.get('grand_tot_play_time', 0))
    except AttributeError:
        return int(0.0)


def get_popular_share_network(customer=None):
    shares = AnalyticsEventsShare.objects\
        .get_events(customer=customer)\
        .get_most_popular_share_network()

    try:
        return shares.get('share_medium').capitalize()
    except AttributeError:
        return None


def get_popular_device(customer=None):
    sessions = AnalyticsEventsGlobalPlay.objects\
        .get_events(customer=customer)\
        .get_most_popular_device()

    try:
        return sessions.get('device_type').capitalize()
    except AttributeError:
        return None


#-------------------- Geography


def get_plays_by_geography(customer=None, date_from=None, date_to=None):
    return AnalyticsEvents.objects\
        .get_events(customer=customer, date_from=date_from, date_to=date_to)\
        .get_plays_by_geography()


def get_plays_by_geography_pin(customer=None, date_from=None, date_to=None):
    return AnalyticsEvents.objects\
        .get_events(customer=customer, date_from=date_from, date_to=date_to)\
        .get_plays_by_geography_pin()


def get_plays_by_country(customer=None, date_from=None, date_to=None):
    return AnalyticsEvents.objects\
        .get_events(customer=customer, date_from=date_from, date_to=date_to)\
        .get_plays_by_country()


#-------------------- Linc chart


def get_play_count_by_type_by_time_period(item_type,
                                          filter_item_types,
                                          customer=None,
                                          time_period=TimePeriod.DAY,
                                          date_from=None,
                                          date_to=None,
                                          *args,
                                          **kwargs):
    return AnalyticsEvents.objects\
        .get_events(customer=customer, date_from=date_from, date_to=date_to)\
        .get_play_count_by_type_by_time_period(
            item_type,
            filter_item_types,
            time_period=time_period,
            *args, **kwargs)


#-------------------- Tables


def get_play_count_by_type(item_type,
                           filter_item_types,
                           customer=None,
                           date_from=None,
                           date_to=None,
                           *args,
                           **kwargs):
    return AnalyticsEvents.objects\
        .get_events(customer=customer, date_from=date_from, date_to=date_to)\
        .get_play_count_by_type(
            item_type,
            filter_item_types,
            *args, **kwargs)


def get_play_count_by_device_type(customer=None, date_from=None, date_to=None):
    return get_play_count_by_type(DeviceType,
                                  DeviceType.get_all_types(),
                                  customer=customer,
                                  date_from=date_from,
                                  date_to=date_to)


#--------------------


def get_narration_by_type(item_type,
                          filter_item_types,
                          customer=None,
                          date_from=None,
                          date_to=None):
    return AnalyticsNarration.objects\
        .get_narration_plays(customer=customer, date_from=date_from, date_to=date_to)\
        .get_narration_by_type(item_type, filter_item_types)
