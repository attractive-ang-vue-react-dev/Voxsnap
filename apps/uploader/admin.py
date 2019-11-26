from django.contrib import admin
from .models import FileItem

# Register your models here.
class FileItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'timestamp', 'uploaded', 'path']

admin.site.register(FileItem, FileItemAdmin)