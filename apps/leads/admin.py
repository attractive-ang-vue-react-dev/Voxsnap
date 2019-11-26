from django.contrib import admin

from .models import PricingLead, MailingList

class MailingListAdmin(admin.ModelAdmin):
    list_display = ['email', 'created', 'status']

admin.site.register(PricingLead)
admin.site.register(MailingList, MailingListAdmin)
