from rest_framework import serializers


class VoiceItemSerializer(serializers.Serializer):
    narration_id = serializers.IntegerField(source='id')
    username = serializers.CharField(source='customer.short_name')
    title = serializers.CharField()
    blog_url = serializers.URLField(source='url')
    display_url = serializers.URLField(source='customer.website_display')
    article_page = serializers.URLField(source='get_absolute_url')
    customer_name = serializers.CharField(source='customer.company_name')
    post_time = serializers.DateTimeField(source='publish_date')
    #audio_url = serializers.URLField(source='audio_redirect')
    audio_url = serializers.SerializerMethodField()
    audio_length = serializers.SerializerMethodField()
    slug = serializers.SlugField()

    def get_audio_length(self, obj):
        return obj.audio_file.audio_length.total_seconds()

    def get_audio_url(self, obj):
        platform = self.context.get('platform')
        return "http://yay.com/" + platform