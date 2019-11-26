import dash_core_components as dcc
import dash_html_components as html

from apps.analytics.querysets import TimeSpan

import plotly.graph_objs as go


def switch_filter_layout(filter_type=None):
    if filter_type is not None:
        options = [{
            'label': str(t).replace('_', ' ').capitalize(),
            'value': str(t)
        } for t in filter_type]
        values = [str(t) for t in filter_type]
        labelStyle = {'display': 'inline-block'}
    else:
        options = [{'label': 'test', 'value': 'test'}],
        labelStyle = {'display': 'none'}
        values = []

    return dcc.Checklist(id='data-sourcetype-filter',
                         options=options,
                         value=values,
                         labelStyle=labelStyle,
                         labelClassName='vs-toggle-label',
                         inputClassName='vs-toggle-checkbox')

show_graph_layout = lambda: \
    html.Div(
        className='graph-parent',
        children=[
            html.Div(id='graph-content'),
            html.Div(
                switch_filter_layout(),
                id='graph-toggle-content',
                className='container')])

narrations_title_layout = lambda blog_url:\
    html.Div(
        className='container',
        children=[
            html.Div(
                children=[html.A(href=blog_url, className='link-post', id='blog_url_link')],
                className="post-title-container")])

header_layout = lambda:\
    html.Div(
        className='analytics-container',
        children=[
            html.H3('Analytics', className='analytics')])

gross_stats_layout = lambda items:\
    html.Div(className='container', children=[
        html.Div(
            className='gross-item-container row',
            children=[
                html.Div(
                    className='gross-item-cell col',
                    children=[
                        html.Div(
                            className='gross-item-content row',
                            children=[
                                html.Div(
                                    className='gross-item-image col-4 %s' % item.css_classname ),
                                html.Div(
                                    className='gross-item-text col-8',
                                    children=[
                                        html.Div(
                                            item.label,
                                            className='label'),
                                        html.Div(
                                            item.get_value(),
                                            id=item.label.lower().replace(' ', ''),
                                            className='data')])])])
                    for item in items])])

period_filter_layout = lambda labels, default_value, date:\
    html.Div(
        className='container daytime-sort',
        children=[
            html.Div(
                className="row daytime-sort-row",
                children=[
                    html.Div(
                        className='plays col',
                        children=[
                            html.Div(
                                className='daytime-plays-title',
                                children=['Plays'])]),
                    html.Div(
                        className='select-period col-10',
                        children=[
                            html.Div(
                                className='row',
                                children=[
                                    html.Div(
                                        className='col',
                                        children=[
                                            dcc.Tabs(
                                                id='day-tabs',
                                                value=default_value,
                                                children=[
                                                    dcc.Tab(
                                                        label=label.replace('_',' ').capitalize(),
                                                        value=label,
                                                        className='period-button',
                                                        selected_className='period-button selected')
                                                    for label in labels])]),
                                    html.Div(
                                        className='col-4',
                                        children=[
                                            html.Div(
                                            id='range_holder',
                                            children=[
                                                dcc.DatePickerRange(
                                                    id='date-range-picker',
                                                    max_date_allowed=date,
                                                    start_date_placeholder_text='From',
                                                    end_date_placeholder_text='To',
                                                    clearable=True,
                                                    initial_visible_month=date)])])])])])])
