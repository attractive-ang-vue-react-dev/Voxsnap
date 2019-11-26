from django.db import models
from apps.users.models import Customer

# Create your models here.
class CustomerVoiceName(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=120, unique=True, db_index=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, related_name='voicename')

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        return super(CustomerVoiceName, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Customer Voice Name"
        verbose_name_plural = "Cutomer Voice Names"