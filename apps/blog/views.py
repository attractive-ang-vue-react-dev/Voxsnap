
from django.shortcuts import render
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView

from .models import Blog

# Create your views here.

class BlogList(ListView):
    model = Blog
    template_name = 'blog_list.html'

class BlogPage(DetailView):
    model = Blog
    template_name = 'blog_page.html'