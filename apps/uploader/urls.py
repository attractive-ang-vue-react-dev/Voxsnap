from django.urls import path

from .views import uploader, FilePolicyAPI, FileUploadCompleteHandler

app_name = 'apps.uploader'
urlpatterns = [
    path('', uploader, name='upload-home'),
    path('complete/', FileUploadCompleteHandler.as_view(), name='upload-complete'),
    path('policy/', FilePolicyAPI.as_view(), name='upload-policy'),
]
