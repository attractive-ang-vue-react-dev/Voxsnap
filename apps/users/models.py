from colorfield.fields import ColorField
from custom_user.models import AbstractEmailUser
from django.core.validators import RegexValidator, validate_slug
from django.db import models
from django.utils.translation import ugettext as _

from voxsnap.utils.constants import BloggingPlatforms


class User(AbstractEmailUser):
    """
    Extending custom user EmailUser model
    """

    first_name = models.CharField(_('first name'), max_length=50, blank=True)
    last_name = models.CharField(_('last name'), max_length=50, blank=True)
    customer = models.ForeignKey('Customer',
                                 on_delete=models.PROTECT,
                                 null=True,
                                 related_name='users')

    def get_full_name(self):
        if self.first_name or self.last_name:
            return str(self.first_name + ' ' + self.last_name).lstrip()
        else:
            return super(User, self).get_full_name()

    get_full_name.short_description = 'Full name'


class Customer(models.Model):
    company_name = models.CharField(max_length=120)
    short_name = models.CharField(max_length=60,
                                  validators=[validate_slug],
                                  null=True,
                                  db_index=True)

    phone_number = models.CharField(max_length=30, blank=True, null=True)
    twitter = models.CharField("Twitter Handle",
                               blank=True,
                               null=True,
                               max_length=16,
                               validators=[
                                   RegexValidator(
                                       regex='^@[A-Za-z0-9_]{1,15}$',
                                       message='Twitter @username')
                               ])
    website = models.URLField(null=True, blank=True)
    website_display = models.CharField(max_length=120, null=True, blank=True)

    brand_color = ColorField(null=True, blank=True)
    google_analytics = models.BooleanField(default=False, blank=True)
    google_analytics_funcname = models.CharField(max_length=128,
                                                 null=True,
                                                 blank=True)
    compact_player = models.BooleanField(default=False, blank=True)
    enterprise = models.BooleanField(default=False, blank=True)

    blogging_platforms = models.CharField(max_length=1,
                                          choices=BloggingPlatforms.CHOICES,
                                          help_text="Blogging Platform / CMS")
    audio_hub = models.BooleanField(help_text="Audio Hub", default=True)
    podcasts = models.BooleanField(help_text="Podcasts", default=False)
    amazon_alexa = models.BooleanField(help_text="Amazon Alexa", default=False)
    google_actions = models.BooleanField(help_text="Google Actions",
                                         default=False)
    audio_hub_description = models.TextField(blank=True, null=True)
    narrations_available = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.company_name


class Notification(models.Model):
    text = models.TextField()
    user = models.ForeignKey('User',
                             null=True,
                             blank=True,
                             on_delete=models.CASCADE,
                             related_name='notifications')
    created_at = models.DateTimeField(auto_now_add=True)
    read_dt = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.text[:30]

    class Meta:
        ordering = ("-created_at", )
