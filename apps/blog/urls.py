from django.urls import path

from .views import BlogList, BlogPage

app_name = 'apps.blog'
urlpatterns = [
    path('', BlogList.as_view(), name='blog_list'),
    path('<slug:slug>/', BlogPage.as_view(), name="blog_page"),
]
