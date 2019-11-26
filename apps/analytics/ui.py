from collections import OrderedDict, defaultdict, namedtuple, Counter

from django.contrib.humanize.templatetags.humanize import intcomma
from django.core.paginator import Paginator
from django.db import models

from typing import List
import paginate

from .models import AnalyticsEvents, \
    AnalyticsEventsPlay, AnalyticsEventsShare, AnalyticsPlaySession, \
    EventType, PlayerType, DeviceType, AnalyticsNarration, ShareType, \
    TimePeriod, TimeSpan

from .utils import *
from . import api, countries

#------------- Geography


def get_narrations_play_map_data(customer=None, date_from=None, date_to=None):

    plays = api\
        .get_plays_by_geography_pin(customer=customer, date_from=date_from, date_to=date_to)

    for play in plays:
        yield Marker(label=play.get('location_city'),
                     value=1,
                     location=play.get('pin'))


def get_narrations_play_map_data_by_country(customer=None,
                                            date_from=None,
                                            date_to=None):
    plays = api\
        .get_plays_by_country(
            customer=customer, date_from=date_from, date_to=date_to)

    for play in plays:
        yield Marker(label=play.get('location_country'),
                     value=play.get('no_of_plays'),
                     location=(countries.lookup_country(
                         name=play.get('location_country'))
                               or {}).get('alpha_3'))


#-------------------------- Type comparison; chart and data


def get_play_count_by_type_comparison_chart(item_type,
                                            filter_item_types,
                                            customer=None,
                                            time_period=TimePeriod.DAY,
                                            time_span=None,
                                            date_from=None,
                                            date_to=None):
    plays = api\
        .get_play_count_by_type_by_time_period(
            item_type,
            filter_item_types, time_period=time_period,
            customer=customer, date_from=date_from, date_to=date_to)

    data = dict()
    l = []
    for filter_item_type in filter_item_types:
        (days, no_of_plays) = [], []

        for (i, play) in enumerate(plays):
            days.append(
                play.get(f"play_{time_period.value}").strftime(
                    '%Y-%m-%d'))  #.append(i)
            no_of_plays.append(play.get(f"{filter_item_type.value}_count"))

        data[str(filter_item_type)] = {
            "type": 'scatter',
            "mode": 'lines',
            "stackgroup": 1,
            "fillcolor": filter_item_type.get_colour(),
            "line": {
                'width': 0
            },
            "hoveron": 'points',
            "showlegend": False,
            "fill": 'tonexty',
            'x': days,
            'y': no_of_plays,
            'name': " ".join(filter_item_type.value.split("_")).capitalize()
        }

        l.append(list(no_of_plays))

    return list(data.values())


def get_country_play_count_table_data(
        customer=None,
        date_from=None,
        date_to=None,
        page=1,
        items_per_page=10,
        showing_on_graph=None,
):
    plays = api\
        .get_plays_by_geography(customer=customer, date_from=date_from, date_to=date_to)
    grouped_plays = group_into_nested_location(plays)

    grouped_plays = paginate.Page(grouped_plays,
                                  page=page,
                                  items_per_page=items_per_page)

    columns = [
        dict(id='country', name='Country'),
        dict(id='pct_listen', name=f'% Listen'),
        dict(id='total_plays', name=('Total Plays'))
    ]
    rows = [
        dict(country=g.country,
             pct_listen=0,
             total_plays=intcomma(g.total_plays)) for g in grouped_plays
    ]

    return (rows, columns, grouped_plays)


def get_play_count_by_device_type_table_data(
        filter_item_types: List[
            DeviceType],  #The class, not an instance DeviceType, not DeviceType.MOBILE
        customer=None,
        time_period=TimePeriod.DAY,
        date_from=None,
        date_to=None,
        page=1,
        showing_on_graph=None,
        items_per_page=None):

    plays = api\
        .get_play_count_by_type(
            DeviceType, DeviceType.get_all_types(),
            customer=customer,
            date_from=date_from,
            date_to=date_to)
    plays = paginate.Page(plays, page=page, items_per_page=items_per_page)
    columns = [
        dict(id='device', name='Device'),
        dict(id='pct_listen', name=f'% Listen'),
        dict(id='total_plays', name='Total Plays'),
        dict(id='show_chart', name='Chart')
    ]
    rows = [{
        'device':
        play.get('device_type'),
        'pct_listen':
        play.get('pct_listen'),
        'total_plays':
        intcomma(play.get('no_of_plays')),
        'show_chart':
        'Showing' if showing_on_graph == play.get('device_type') else 'Show'
    } for play in plays]

    return (rows, columns, plays)


def get_narration_by_type_comparison_table(item_type,
                                           filter_item_types,
                                           customer=None,
                                           date_from=None,
                                           date_to=None,
                                           page=1,
                                           items_per_page=10,
                                           showing_on_graph=None):
    def get_narration_rows(narration):
        return dict([
            ('narration', narration.get('title')),
            ('blog_url', narration.get('blog_url')),
            *item_type.get_table_row(narration),
            ('total_plays', intcomma(narration.get('total_count', 0))),
            ("pct_listen", 0),
            ('show_chart', 'Showing'
             if showing_on_graph == narration.get('device_type') else 'Show')
        ])

    narrations = api\
        .get_narration_by_type(
            item_type,
            filter_item_types,
            customer=customer, date_from=date_from, date_to=date_to)

    narrations = paginate.Page(narrations,
                               page=page,
                               items_per_page=items_per_page)
    rows = list(map(get_narration_rows, narrations))

    columns = [{
        'id': 'narration',
        'name': 'Post'
    }, *item_type.get_table_columns(), {
        'id': 'total_plays',
        'name': 'Total Plays'
    }, {
        'id': 'pct_listen',
        'name': f'% Listen'
    }, {
        'id': 'show_chart',
        'name': f'Chart'
    }]

    return (rows, columns, narrations)
