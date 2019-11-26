from rest_framework import serializers

from apps.narrations.models import PlaylistNarrationsThroughModel
from apps.sales.models import Order

from .models import \
    Narrator, Narration, \
    NarratorLanguage, Playlist

from apps.users.serializers import CustomerSerializer


class NarratorLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NarratorLanguage
        fields = '__all__'


class NarratorSerializer(serializers.ModelSerializer):
    languages = NarratorLanguageSerializer(many=True, read_only=True)

    class Meta:
        model = Narrator
        fields = '__all__'


class NarratorPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Narrator
        fields = ['id', 'first_name', 'sample_url']


class OrderShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'created']


class NarrationSerializer(serializers.ModelSerializer):
    narrator = NarratorSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    status = serializers.CharField(source='get_status_display')
    player_status = serializers.CharField(source='get_status_display')
    order = OrderShortSerializer(read_only=True)

    class Meta:
        model = Narration
        fields = '__all__'


class NarrationUpdateSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.save()
        return super().update(instance, validated_data)

    class Meta:
        model = Narration


class NarrationCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Narration
        exclude = ['order', 'word_count']


class NarrationNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Narration
        fields = ['id', 'url']


class PlaylistNarrationsThroughModelShortSerializer(serializers.ModelSerializer
                                                    ):
    class Meta:
        model = PlaylistNarrationsThroughModel
        fields = ['narration']


class PlaylistSerializer(serializers.ModelSerializer):
    narrations = PlaylistNarrationsThroughModelShortSerializer(
        many=True, source='narrations_data')
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Playlist
        fields = '__all__'

    def create(self, validated_data):
        # http://www.django-rest-framework.org/api-guide/relations/#writable-nested-serializers

        if 'narrations_data' in validated_data:
            narrations_data = validated_data.pop('narrations_data')
        else:
            narrations_data = []

        playlist = super().create(validated_data)

        for narration_data in narrations_data:
            PlaylistNarrationsThroughModel.objects.create(playlist=playlist,
                                                          **narration_data)

        return playlist

    def update(self, instance, validated_data):
        # http://www.django-rest-framework.org/api-guide/relations/#writable-nested-serializers
        if 'narrations_data' in validated_data:
            narrations_data = validated_data.pop('narrations_data')
        else:
            narrations_data = []

        playlist = super().update(instance, validated_data)
        playlist.narrations_data.all().delete()

        for narration_data in narrations_data:
            PlaylistNarrationsThroughModel.objects.create(playlist=playlist,
                                                          **narration_data)

        return playlist


class PlaylistListSerializer(PlaylistSerializer):
    narrations_count = serializers.IntegerField()

    class Meta(PlaylistSerializer.Meta):
        pass


class PlaylistRetrieveSerializer(PlaylistSerializer):
    narrations = NarrationNestedSerializer(many=True, read_only=True)

    class Meta(PlaylistSerializer.Meta):
        pass
