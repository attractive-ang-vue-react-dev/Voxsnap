from django.views.generic.base import RedirectView
from django.urls import include, path, re_path

from apps.articles.views import ArticlePageView


urlpatterns = [
    path(r'', RedirectView.as_view(url='https://voxsnap.com/library/')),
    #path("^feeds/(?P<format>.*)$", views.article_page_feed, name="article_page_feed"),
    #path("^tag/(?P<tag>.*)/feeds/(?P<format>.*)$", views.article_page_feed, name="article_page_feed_tag"),
    #path("^tag/(?P<tag>.*)$", views.article_page_list, name="article_page_list_tag"),
    #path("^genre/(?P<genre>.*)/feeds/(?P<format>.*)$", views.article_page_feed, name="article_page_feed_genre"),
    #path("^author/(?P<username>.*)/feeds/(?P<format>.*)$", views.article_page_feed, name="article_page_feed_author"),

    #path("^genre/(?P<genre>.*)$", views.article_page_list, name="article_page_list_genre"),
    #path("^author/(?P<username>.*)$", views.article_page_list, name="article_page_list_author"),

    #path("^archive/(?P<year>\d{4})/(?P<month>\d{1,2})$", views.article_page_list, name="article_page_list_month"),
    #path("^archive/(?P<year>\d{4})$", views.article_page_list, name="article_page_list_year"),
    #path("^(?P<year>\d{4})/(?P<month>\d{1,2})/(?P<day>\d{1,2})/" "(?P<slug>.*)$", views.article_page_detail, name="article_page_detail_day"),
    #path("^(?P<year>\d{4})/(?P<month>\d{1,2})/(?P<slug>.*)$", views.article_page_detail, name="article_page_detail_month"),
    #path("^(?P<year>\d{4})/(?P<slug>.*)$", views.article_page_detail, name="article_page_detail_year"),

    path('<slug:company_name>/<slug:slug>', ArticlePageView.as_view(), name="article_page_detail"),
]