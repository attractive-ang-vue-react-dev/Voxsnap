import re

from collections import defaultdict, OrderedDict, Counter, namedtuple

from django.contrib.humanize.templatetags.humanize import intcomma
from django.db import models

from enum import Enum


def group_by_attribute(rows,
                       attribute,
                       getter=lambda r: r,
                       key_getter=lambda r: r):
    data = defaultdict(list)

    for row in rows:
        if type(row) == dict:
            value = key_getter(row[attribute])
        else:
            value = key_getter(getattr(row, attribute))

        data[value].append(getter(row))

    return data


group_by_location_city = lambda rows: group_by_attribute(rows, 'location_city')
group_by_location_state = lambda rows: group_by_attribute(
    rows, 'location_state')
group_by_location_country = lambda rows: group_by_attribute(
    rows, 'location_country')

Marker = namedtuple('Marker', ('location', 'value', 'label'))


def group_into_nested_location(events):
    Country = namedtuple('Country', ('country', 'states', 'total_plays'))

    def combine_country_and_sum_of_plays(*dcts):
        for i in set(dcts[0]).intersection(*dcts[1:]):
            yield Country(*((i, ) + tuple(d[i] for d in dcts)))

    grouped_by_country = group_by_location_country(events)
    grouped_by_geography = {}

    country_play_counts = Counter()
    for (country, country_events) in sorted(grouped_by_country.items(),
                                            key=lambda i: i[0]):
        if country not in grouped_by_geography:
            grouped_by_geography[country] = {}

        for (state,
             state_events) in group_by_location_state(country_events).items():
            grouped_by_city = group_by_location_city(state_events)
            country_play_counts[country] += \
                sum(
                    sum(play.get('no_of_plays') for play in plays)
                        for (city, plays) in grouped_by_city.items())
            grouped_by_geography[country][state] = grouped_by_city

    common_entries = combine_country_and_sum_of_plays(
        grouped_by_geography, dict(**country_play_counts))
    return sorted(list(common_entries),
                  key=lambda country: country.total_plays,
                  reverse=True)


def get_expression(data_set, field_expression, separator='__'):
    if data_set:
        try:
            return f"{data_set.get_data_set()}{separator}{field_expression}"
        except AttributeError:
            return data_set and (f"{data_set}{separator}{field_expression}")
    else:
        return field_expression


class BaseEnum(Enum):
    def __str__(self):
        return self.value

    def get_label(self):
        return " ".join([x.capitalize() for x in self.value.split("_")])

    def get_value(self):
        return self.value

    def get_data_set(cls):
        raise NotImplementedError

    @classmethod
    def get_field_name(cls):
        return "_"\
            .join(re.sub('(?!^)([A-Z][a-z]+)', r' \1', cls.__name__).split())\
            .lower()

    @classmethod
    def get_labels(cls):
        return list(map(lambda p: p.get_label(), cls))

    @classmethod
    def get_values(cls):
        return list(map(str, cls))

    @classmethod
    def get_all_types(cls):
        return list(cls)

    @classmethod
    def get_colours(cls):
        return list(p.get_colour() for p in cls.get_all_types())

    @classmethod
    def get_table_columns(cls):
        return [{
            'id': id,
            'name': name
        } for (id, name) in zip(cls.get_values(), cls.get_labels())]

    @classmethod
    def get_table_row(cls, aggregate_dict):
        return [(item_type.value,
                 intcomma(aggregate_dict.get(f"{item_type.value}_count")))
                for item_type in cls.get_all_types()]

    def get_query(self, *args, **kwargs):
        raise NotImplementedError()

    def get_colour(self):
        raise NotImplementedError()

    def get_when_expression(self, data_set=None):
        return models.When(self.get_query(data_set=data_set),
                           then=models.Value(self.value))

    def get_sum_expression(self, data_set=None):
        return {
            f'{self.get_value()}_count':
            models.Sum(
                models.Case(models.When(self.get_query(data_set=data_set),
                                        then=1),
                            default=models.Value('0'),
                            output_field=models.IntegerField()))
        }

    @classmethod
    def get_sum_group_by_types(cls,
                               data_set=None,
                               item_types=None,
                               *args,
                               **kwargs):
        if item_types is None:
            item_types = cls.get_all_types()

        d = {'total_count': models.Count('*')}
        for item_type in item_types:
            if data_set is None:
                data_set = item_type.get_data_set()
            d.update(**item_type.get_sum_expression(data_set=data_set))

        return d

    @classmethod
    def get_group_by_cases(cls,
                           data_set=None,
                           item_types=None,
                           *args,
                           **kwargs):
        if item_types is None:
            item_types = cls.get_all_types()

        return \
            models.Case(
                *[item_type.get_when_expression(data_set=data_set) for item_type in item_types],
                output_field=models.CharField())
