from django.db import models

from apps.users.models import User, Customer

# Create your models here.
class FileItem(models.Model):
    customer                        = models.ForeignKey(Customer, null=True, on_delete=models.DO_NOTHING)
    user                            = models.ForeignKey(User, null=True, on_delete=models.DO_NOTHING)
    path                            = models.TextField(null=True)
    url                             = models.URLField(null=True)
    size                            = models.BigIntegerField(default=0)
    file_type                       = models.CharField(max_length=120, null=True, blank=True)
    timestamp                       = models.DateTimeField(auto_now_add=True)
    updated                         = models.DateTimeField(auto_now=True)
    uploaded                        = models.BooleanField(default=False)
    active                          = models.BooleanField(default=True)
    audio_length                    = models.DurationField(null=True, blank=True)

    def __str__(self):
        return f'{self.customer} {self.path}'

    class Meta:
        ordering: ['-id']