from copy import deepcopy

from custom_user.admin import EmailUserAdmin
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from apps.sales.admin import UserStripeDataInline

from .models import Customer, Notification, User


class UserAdmin(EmailUserAdmin):
    list_display = ('email', 'get_full_name', 'is_staff')
    inlines = [UserStripeDataInline]

    def get_fieldsets(self, request, obj=None):
        fieldset_super = super(UserAdmin, self).get_fieldsets(request, obj)
        fieldset_extended = list(deepcopy(fieldset_super))
        fieldset_extended.insert(1, (_('User info'), {
            'fields': ('first_name', 'last_name', 'customer')
        }))

        return tuple(fieldset_extended)


class UserInline(admin.TabularInline):
    model = User


class CustomerAdmin(admin.ModelAdmin):
    inlines = [UserInline]


class NotificationAdmin(admin.ModelAdmin):
    list_filter = ('user', )
    search_fields = ('text', )


admin.site.register(User, UserAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Notification, NotificationAdmin)
