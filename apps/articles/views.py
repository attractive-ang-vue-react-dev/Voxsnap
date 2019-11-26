from django.shortcuts import render
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView

from apps.narrations.models import Narration

# Create your views here.\

class ArticlePageView(DetailView):
    model = Narration
    template_name = 'article_page_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['narration'] = Narration.objects.filter(customer__short_name=self.kwargs['company_name'], slug=self.kwargs['slug']).get()
        return context

class ArticlePageList(ListView):
    model = Narration
    template_name = 'article_page_list.html'