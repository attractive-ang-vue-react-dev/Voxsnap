from rest_framework import serializers


class CastingIntegerField(serializers.IntegerField):
    def to_native(self, value):
        return int(value)
