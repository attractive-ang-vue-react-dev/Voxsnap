from collections import namedtuple, OrderedDict, defaultdict
from datetime import datetime, timedelta

from django.contrib.humanize.templatetags.humanize import intcomma
from django.utils import timezone
from dateutil import relativedelta

import dash_core_components as dcc
import dash_html_components as html

import plotly.graph_objs as go
import pandas as pd

from apps.analytics import ui as analytics_ui
from apps.analytics import api as analytics_api

from . import layouts, actions
from .utils import create_graph, create_map


def component_gross_stats(customer=None):
    GrossStat = namedtuple("GrossStat",
                           ('label', 'get_value', 'css_classname'))

    items = [
        GrossStat(
            'Listeners', lambda: intcomma(
                analytics_api.get_no_of_listeners(customer=customer)),
            "listeners"),
        GrossStat(
            'Total Listen Time', lambda:
            f'{intcomma(analytics_api.get_total_listen_time(customer=customer))} min',
            "total-listen-time"),
        GrossStat(
            'Popular Device', lambda: (analytics_api.get_popular_device(
                customer=customer) or "N/A"), "popular-device"),
        GrossStat(
            'Most Shared on', lambda: (analytics_api.get_popular_share_network(
                customer=customer) or "N/A"), "most-shared-on")
    ]

    return layouts.gross_stats_layout(items)


def component_filter_periods():
    today = timezone.now().today()
    labels = analytics_api.TimeSpan.get_time_dict(today=today)

    return layouts.period_filter_layout(
        labels, analytics_api.TimeSpan.THIS_MONTH.get_value(), today)


def main_component():
    blog_url = None

    return html.Div(id='app-layout',
                    className='layout_container',
                    children=[
                        html.Div(className='app-container',
                                 children=[
                                     layouts.header_layout(),
                                     component_gross_stats(),
                                     layouts.narrations_title_layout(blog_url),
                                     component_filter_periods(),
                                     layouts.show_graph_layout(),
                                     component_select_sections(),
                                     html.Div(id='tab-content'),
                                     html.Div(1,
                                              id='pagination-current-page',
                                              style={'display': 'none'}),
                                     html.Div("None",
                                              id='showing-on-shares-graph',
                                              style={'display': 'none'}),
                                     html.Div("None",
                                              id='showing-on-geography-graph',
                                              style={'display': 'none'}),
                                     html.Div("None",
                                              id='showing-on-devices-graph',
                                              style={'display': 'none'}),
                                     html.Div("None",
                                              id='showing-on-sources-graph',
                                              style={'display': 'none'}),
                                 ])
                    ])


def component_graph_toggle(tab, *args, **kwargs):
    filter_type = None

    if tab == 'sources':
        filter_type = analytics_api.PlayerType
    elif tab == 'shares':
        filter_type = analytics_api.ShareType
    elif tab == 'devices':
        filter_type = analytics_api.DeviceType

    return layouts.switch_filter_layout(filter_type=filter_type)


def get_date_range(tab_date_filter, date_range_filter_start,
                   date_range_filter_end):
    date_from = date_to = None

    if date_range_filter_start and date_range_filter_end:
        tab_date_filter = 'custom'

        timespan = analytics_api.TimeSpan(tab_date_filter)
        timespan.set_custom_timespan_range(date_range_filter_start,
                                           date_range_filter_end)
    else:
        timespan = analytics_api.TimeSpan(tab_date_filter)

    (date_from, date_to) = timespan.get_timespan()

    return (date_from, date_to)


def component_section_graph(tab,
                            tab_date_filter,
                            date_range_filter_start,
                            date_range_filter_end,
                            toggle_filters=None,
                            *args,
                            **kwargs):
    customer = analytics_api\
        .get_customer(customer_short_name='ycombinator')

    (date_from, date_to) = \
        get_date_range(tab_date_filter, date_range_filter_start, date_range_filter_end)

    if tab == 'geography':
        markers = analytics_ui\
            .get_narrations_play_map_data(customer=customer, date_from=date_from, date_to=date_to)

        return create_map(markers=markers)

    else:
        FilterType = None

        if tab == 'sources':
            FilterType = analytics_api.PlayerType
        elif tab == 'shares':
            FilterType = analytics_api.ShareType
        elif tab == 'devices':
            FilterType = analytics_api.DeviceType

        if FilterType is not None:
            try:
                filter_types = [
                    FilterType(filter_item) for filter_item in toggle_filters
                ]
            except:
                filter_types = FilterType.get_all_types()

            data = analytics_ui\
                .get_play_count_by_type_comparison_chart(
                    FilterType,
                    filter_types,
                    customer=customer,
                    date_from=date_from,
                    date_to=date_to)

            return create_graph(data)

    return html.Div(className="dummy")


def component_table_paginator(page, pagination_list):
    from . import actions

    def get_page_items():
        page_item = lambda page_no: dcc.Tab(className='page-item',
                                            selected_className='active',
                                            label=f"{page_no}",
                                            value=f"{page_no}")

        return [page_item(i + 1) for i in range(pagination_list.page_count)]

    return \
        html.Nav(
            id="pagination",
            children=[
                dcc.Tabs(
                    value=1,
                    className='pagination',
                    id="pagination-pages",
                    children=get_page_items())])


def component_paginated_table(tab,
                              page,
                              items_per_page,
                              on_devices_graph,
                              on_geography_graph,
                              on_shares_graph,
                              on_sources_graph,
                              app=None,
                              *args,
                              **kwargs):
    rows, columns = (None, None)
    customer = analytics_api.get_customer(customer_short_name='ycombinator')

    if tab is None:
        return

    if tab == 'geography':
        (rows, columns, pagination_list) = analytics_ui\
            .get_country_play_count_table_data(
                page=page,
                showing_on_graph=on_geography_graph,
                items_per_page=items_per_page,
                customer=customer)
    elif tab in ('sources', 'shares'):
        if tab == 'sources':
            showing_on_graph = on_sources_graph
            filter_type = analytics_api.PlayerType
        elif tab == 'shares':
            showing_on_graph = on_shares_graph
            filter_type = analytics_api.ShareType

        (rows, columns, pagination_list) = analytics_ui\
            .get_narration_by_type_comparison_table(
                filter_type,
                filter_type.get_all_types(),
                page=page,
                items_per_page=items_per_page,
                customer=customer,
                showing_on_graph=showing_on_graph)
    elif tab == 'devices':
        (rows, columns, pagination_list) = analytics_ui\
            .get_play_count_by_device_type_table_data(
                analytics_api.DeviceType.get_all_types(),
                page=page,
                items_per_page=items_per_page,
                customer=customer,
                showing_on_graph=on_devices_graph)

    def table_value(column, row, i):
        if column['id'] == 'narration':
            content = html.A(row.get(column['id']),
                             className="external-link",
                             href=row.get('blog_url'),
                             target="_blank")
        elif column['id'] == 'show_chart':
            content = html.A(row.get(column['id']),
                             n_clicks=0,
                             id=f'show-{tab}-chart-{i}',
                             className='showing')
        else:
            content = row.get(column['id'])

        return html.Td(content)

    return html.Div(className="table-holder",
                    children=[
                        html.Table(id='table',
                                   className='table',
                                   children=[
                                       html.Thead(
                                           html.Tr(children=[
                                               html.Th(column['name'])
                                               for column in (columns or [])
                                           ])),
                                       html.Tbody([
                                           html.Tr(children=[
                                               table_value(column, row, i)
                                               for column in (columns or [])
                                           ])
                                           for i, row in enumerate(rows or [])
                                       ])
                                   ]),
                        component_table_paginator(page, pagination_list)
                    ])


def component_select_sections():
    labels = ['sources', 'geography', 'shares', 'devices']

    pagination_options = [{
        'label': '10 Items',
        'value': 10
    }, {
        'label': '25 Items',
        'value': 25
    }, {
        'label': '50 Items',
        'value': 50
    }]

    return html.Div(
        className="return-sections",
        children=[
            html.Div(
                dcc.Tabs(
                    className='analytics-filters',
                    id='sections-tabs',
                    value='sources',
                    children=[
                        dcc.Tab(
                            className="return-section-tab-btn",
                            label=label.upper(),
                            value=label,
                            selected_className="return-section-tab-btn-active")
                        for label in labels
                    ])),
            html.Div(className='dpd-container',
                     children=[
                         dcc.Dropdown(id='dropdown-pagination-options',
                                      options=pagination_options,
                                      value=10,
                                      searchable=False)
                     ])
        ])
