from django.core.validators import EmailValidator
from rest_framework import serializers
from .models import MailingList


class MailingListSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True, validators=[EmailValidator])

    class Meta:
        model = MailingList
        exclude = ['id', 'status']

    def create(self, validated_data):
        return MailingList.objects.get_or_create(**validated_data)
