from django.urls import path, include

from .views import CategorySearch, CustomerSearch, TitleSearch, GenericSearch

app_name = 'apps.voice'
urlpatterns = [
    path('<slug:platform>/', include([
        path('category/', CategorySearch.as_view(), name='voice-category'),
        path('customer/', CustomerSearch.as_view(), name='voice-customer'),
        path('title/', TitleSearch.as_view(), name='voice-title'),
        path('generic/', GenericSearch.as_view(), name='voice-generic')
    ])),
]
