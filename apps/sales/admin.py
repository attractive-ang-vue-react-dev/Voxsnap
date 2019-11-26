from django.contrib import admin

from apps.narrations.admin import NarrationInline
from apps.sales.models import AdditionalService

from .models import Order, PromoCode, UserStripeData


class OrderAdmin(admin.ModelAdmin):
    inlines = [NarrationInline]
    list_display = ['id', 'customer', 'created', 'quantity', 'stripe_id']


class PromoCodeOrderInline(admin.TabularInline):
    model = Order
    fields = ('created', 'user', 'stripe_id')
    readonly_fields = ('created', 'user', 'stripe_id')
    can_delete = False
    extra = 0

    def has_add_permission(self, request, obj=None):
        return False


class UserStripeDataInline(admin.StackedInline):
    model = UserStripeData


class PromoCodeAdmin(admin.ModelAdmin):
    inlines = [PromoCodeOrderInline]


@admin.register(AdditionalService)
class AdditionalServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'price']
    search_fields = ['title']


admin.site.register(Order, OrderAdmin)
admin.site.register(PromoCode, PromoCodeAdmin)
