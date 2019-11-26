from django.db import models
from django.core.exceptions import ValidationError
import uuid

from apps.users.models import Customer

# Create your models here.
class Lead(models.Model):
    STATUS = (
        ('U', 'Unread'),  # new lead
        ('V', 'Viewed'),  # lead reviewed
        ('R', 'Replied'),  # msg sent to lead
        ('S', 'Sold'))  # lead is now a customer

    PACKAGES = (('starter', 'Starter'), ('advanced', 'Advanced'),
                ('complete', 'Complete'), ('custom', 'Custom'))

    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    received = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=1,
                              choices=STATUS,
                              default='U',
                              db_index=True)
    package = models.CharField(max_length=8, choices=PACKAGES)
    order = models.ForeignKey('sales.Order',
                              on_delete=models.CASCADE,
                              related_name='leads',
                              blank=True,
                              null=True)

    full_name = models.CharField(max_length=128)
    company = models.CharField(max_length=64, blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, null=True)

    message = models.TextField(blank=True)

    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Lead [{self.pk}], ({self.full_name}), status ({self.get_status_display()})'


class PricingLead(Lead):
    narrations_needed = models.PositiveIntegerField(default=1)
    podcast_distribution = models.BooleanField(default=0)
    alexa_skill = models.BooleanField(default=0)
    alexa_flash_briefing = models.BooleanField(default=0)
    google_news = models.BooleanField(default=0)
    google_action = models.BooleanField(default=0)
    thirdparty_integration = models.BooleanField(default=0)

class MailingList(models.Model):
    STATUS = (
        ('N', 'Unprocessed'),
        ('S', 'Subscribed'),
        ('U', 'Unsubscribed'))

    id = models.BigAutoField(primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True)
    ip_addr = models.GenericIPAddressField(blank=True, null=True)
    status = models.CharField(max_length=1, choices=STATUS, default='N')

    def __str__(self):
        return self.email
