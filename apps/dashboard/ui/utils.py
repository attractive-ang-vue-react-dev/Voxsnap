import dash_core_components as dcc

import plotly.graph_objs as go
import pandas as pd


def create_map(access_token=None, markers=None):
    df = pd.DataFrame(markers)
    try:
        df['lon'], df['lat'] = zip(*df.location)
    except AttributeError:
        return

    df = df.drop(columns=['location'])
    df = df.groupby([df.lon, df.lat, df.label], as_index=False)['value'].sum()

    scale = 4

    data = [
        go.Scattergeo(lon=df.lon,
                      lat=df.lat,
                      text=df.label + ": " + df.value.astype(str),
                      name="asd",
                      marker=dict(size=df.value / scale,
                                  color='#ff5d86',
                                  line=dict(width=0.5, color='#ff5d86'),
                                  sizemode='area'))
    ]

    layout = dict(
        # title = 'users by location',
        showlegend=False,
        autosize=True,
        margin=go.layout.Margin(l=0, r=0, b=0, t=0, pad=0),
        xaxis=dict(fixedrange=True),
        yaxis=dict(fixedrange=True),
        dragmode=False,
        font=dict(family="'AvenirNext', 'avenir next', sans-serif",
                  size="13px"),
        hoverlabel=dict(bgcolor='#211228', bordercolor='#ffffff'),
        geo=dict(scope='world',
                 projection=dict(type='Mercator'),
                 showframe=False,
                 showland=True,
                 showcountries=True,
                 showlakes=True,
                 subunitcolor="#d5d5d5",
                 subunitwidth=1,
                 lakecolor="#ffffff",
                 landcolor='#f9f9f9',
                 countrycolor="#d5d5d5",
                 countrywidth=1,
                 automargin=False,
                 coastlinecolor="#d5d5d5"))

    config = {'scrollZoom': False}
    return dcc.Graph(id='graph',
                     figure=dict(data=data, layout=layout, config=config))


def create_graph(data, chart_title='', x_title='', y_title=''):
    return \
        dcc.Graph(
            className='stacked-area-plot',
            figure={
                'data': data,
                'layout': go.Layout({
                    "title": f"{chart_title}",
                    "xaxis": {
                        "title": f"{x_title}",
                        "type": "date",
                        'showgrid': False,
                        "autorange": True,
                        "tickangle": 0,
                        "showspikes": False,
                        "automargin": True
                    },
                    "yaxis": {
                        "title": f"{y_title}",
                        "type": "linear",
                        "autorange": True,
                        "automargin": True

                    },
                    'dragmode': False,
                    "autosize": True,
                    "hovermode": "x",
                    "hoverlabel": {
                        "font": {
                            "color": "rgb(255, 255, 255)"
                        },
                        "bgcolor": "rgb(80, 103, 132)",
                        "bordercolor": "rgb(80, 103, 132)"
                    },
                    'font': dict(family="AvenirNext, 'avenir next', sans-serif"),
                    'showlegend': False,
                    'legend': dict(orientation="h")})})
