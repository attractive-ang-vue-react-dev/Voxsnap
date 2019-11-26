from django.db import models
from django.core.validators import validate_integer

 # Create your models here.
class Blog(models.Model):
    STATUS = (
        ('D', 'Draft'),
        ('P', 'Published'))

    id = models.BigAutoField(primary_key=True)
    publish_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=STATUS, default='D', db_index=True)
    slug = models.SlugField(max_length=255, db_index=True)

    title = models.CharField(max_length=128)
    image = models.ImageField()
    description = models.TextField()

    player_username = models.CharField(max_length=64, blank=True, null=True)
    player_narration = models.CharField(max_length=30, blank=True, null=True, validators=[validate_integer])

    content = models.TextField(blank=True)

    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Blog [{self.pk}], ({self.title}), status ({self.get_status_display()})'