from rest_framework import serializers
from apps.narrations.models import Category


class NarrationSerializer(serializers.Serializer):
    narration_id = serializers.IntegerField(source='id')
    username = serializers.CharField(source='customer.short_name')
    title = serializers.CharField()
    blog_url = serializers.URLField(source='url')
    display_url = serializers.URLField(source='customer.website_display')
    article_page = serializers.URLField(source='get_absolute_url')
    customer_name = serializers.CharField(source='customer.company_name')
    post_time = serializers.DateTimeField(source='publish_date')
    audio_url = serializers.URLField(source='audio_file.url')
    audio_length = serializers.SerializerMethodField()
    twitter = serializers.CharField(source='customer.twitter')
    slug = serializers.SlugField()

    def get_audio_length(self, obj):
        try:
            return obj.audio_file.audio_length.total_seconds()
        except AttributeError:
            return 0.0


class DataWithExtraMixin:
    def data_with_extra(self, extra_data):
        ret = super().data
        ret.update(extra_data)
        return serializers.ReturnDict(ret, serializer=self)


class ItemLibrarySerializer(DataWithExtraMixin, serializers.Serializer):
    narrations = NarrationSerializer(source='*')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('pk', 'name', 'slug')


class LibrarySerializer(NarrationSerializer):
    image = serializers.URLField()
    categories = serializers.SlugRelatedField(many=True,
                                              read_only=True,
                                              slug_field='slug')
    main_category = serializers.SerializerMethodField()
    main_category_name = serializers.SerializerMethodField()
    sub_category = serializers.SerializerMethodField()
    sub_category_name = serializers.SerializerMethodField()
    exerpt = serializers.SerializerMethodField()

    def get_main_category(self, obj):
        cur_category = obj.categories.first()
        maybe_parent = cur_category.parent.first()
        if maybe_parent:
            return maybe_parent.slug
        return cur_category.slug

    def get_main_category_name(self, obj):
        cur_category = obj.categories.first()
        maybe_parent = cur_category.parent.first()
        if maybe_parent:
            return maybe_parent.name
        return cur_category.name

    def get_sub_category(self, obj):
        cat = obj.categories.first()
        if not cat.parent.first():
            return None
        return cat.slug

    def get_sub_category_name(self, obj):
        cat = obj.categories.first()
        if not cat.parent.first():
            return None
        return cat.name

    def get_exerpt(self, obj):
        if obj.description:
            return obj.description[:185]
        else:
            return obj.content[:185]


class PlaylistSerializer(DataWithExtraMixin, serializers.Serializer):
    narrations = serializers.SerializerMethodField()
    playlist_name = serializers.CharField(source='name')
    display_name = serializers.CharField(source='customer.company_name')
    playlist_url = serializers.URLField()

    def get_narrations(self, instance):
        """Hack so that we can retain the playlist order"""
        narrs = instance.narrations.order_by('narrations_data__order')
        return LibrarySerializer(narrs, many=True).data

class SubcategorySerializer(serializers.ModelSerializer):
    parent = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ('pk', 'name', 'slug', 'parent')
        depth = 1

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        try:
            ret['parent'] = ret['parent'][0]
        except IndexError:
            del ret['parent']
        return ret
