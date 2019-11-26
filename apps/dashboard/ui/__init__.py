from django_plotly_dash import DjangoDash

from dash.exceptions import InvalidCallbackReturnValue

from . import components, actions

app = DjangoDash(name="voxsnap",
                 app_name="voxsnap",
                 suppress_callback_exceptions=True)

app.layout = components.main_component()
actions.register_main_callbacks(app)
