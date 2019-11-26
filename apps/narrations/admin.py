from django.contrib import admin
from ordered_model.admin import (OrderedInlineModelAdminMixin,
                                 OrderedTabularInline)

from apps.narrations.models import PlaylistNarrationsThroughModel

from .models import Category, Narration, Narrator, NarratorLanguage, Playlist


class NarrationInline(admin.StackedInline):
    model = Narration
    extra = 1


class NarrationsAdmin(admin.ModelAdmin):
    list_display = ['url', 'order', 'narrator', 'status', 'word_count']
    search_fields = ['title']


@admin.register(NarratorLanguage)
class NarratorLanguageAdmin(admin.ModelAdmin):
    pass


class PlaylistNarrationsThroughModelTabularInline(OrderedTabularInline):
    model = PlaylistNarrationsThroughModel
    fields = ('narration', 'order', 'move_up_down_links')
    readonly_fields = ('order', 'move_up_down_links')
    extra = 1
    ordering = ('order', )


@admin.register(Playlist)
class PLaylistAdmin(OrderedInlineModelAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'created_dt', 'narrations_count')
    filter_horizontal = ('narrations', )
    list_filter = ('created_dt', )
    inlines = (PlaylistNarrationsThroughModelTabularInline, )


admin.site.register(Narrator)
admin.site.register(Narration, NarrationsAdmin)
admin.site.register(Category)
