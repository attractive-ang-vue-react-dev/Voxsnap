from dash.dependencies import Input, Output

from . import components


def parse_number(no):
    try:
        return int(no)
    except:
        return 1


def create_showing_callback(app, tab, no_of_rows):
    @app.callback(Output(f'showing-on-{tab}-chart', 'children'),
                  inputs=[
                      Input(f'show-on-{tab}-chart-{i + 1}', 'n_clicks')
                      for i in range(no_of_rows)
                  ])
    def show(*args, **kwargs):
        return False


def create_callback(output_element, retfunc):
    """creates a callback function"""
    import os, sys

    def callback(*input_values):
        print('callback fired with :"{}"  output:{}/{}'.format(
            input_values, output_element.component_id,
            output_element.component_property))
        if input_values is not None and input_values != 'None':
            try:
                retval = retfunc(*input_values)
            except Exception as e:
                exc_type, exc_obj, exc_tb = sys.exc_info()
                fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
                print('Callback Exception:', e, exc_type, fname,
                      exc_tb.tb_lineno)
                print('parameters:', *input_values)
            return retval
        else:
            return []

    return callback


def register_main_callbacks(app):
    @app.expanded_callback(Output('tab-content', 'children'),
                           inputs=[
                               Input('sections-tabs', 'value'),
                               Input('pagination-current-page', 'children'),
                               Input('dropdown-pagination-options', 'value'),
                               Input('showing-on-devices-graph', 'children'),
                               Input('showing-on-geography-graph', 'children'),
                               Input('showing-on-shares-graph', 'children'),
                               Input('showing-on-sources-graph', 'children'),
                           ])
    def handle_pagination_limit(tab, page, *args, **kwargs):
        kwargs['app'] = app
        return components.component_paginated_table(tab, parse_number(page),
                                                    *args, **kwargs)

    #traverse paginator
    app.expanded_callback(Output('pagination-current-page', 'children'),
                          inputs=[
                              Input('pagination-pages', 'value')
                          ])(lambda page, *args, **kwargs: parse_number(page))

    app.expanded_callback(Output('graph-content', 'children'),
                          inputs=[
                              Input('sections-tabs', 'value'),
                              Input('day-tabs', 'value'),
                              Input('date-range-picker', 'start_date'),
                              Input('date-range-picker', 'end_date'),
                              Input('data-sourcetype-filter', 'values')
                          ])(components.component_section_graph)

    app.expanded_callback(Output('graph-toggle-content', 'children'),
                          inputs=[Input('sections-tabs', 'value')
                                  ])(components.component_graph_toggle)
