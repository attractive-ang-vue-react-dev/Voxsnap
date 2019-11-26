import datetime
from .models import *

import json, datetime


def dump_events_json():
    def get_field_value(event, field):
        value = getattr(event, field)
        if type(value) in (datetime.datetime, datetime.date):
            return str(value)
        elif type(value) == AnalyticsNarration:
            return value.id

        return value

    def prepare():
        for event in AnalyticsEvents.objects.all().plays():
            yield {
                field: get_field_value(event, field)
                for field in (f.name
                              for f in AnalyticsEvents._meta.get_fields())
            }

    return json.dumps(list(prepare()), sort_keys=True, indent=2)
