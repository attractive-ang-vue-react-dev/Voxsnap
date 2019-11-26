"""
voxsnap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

from apps.leads.views import (PackagesView, QuestionaireView,
                              TimDraperPlaylistView, MailingListView)
# from apps.analytics.views import PlaysStatsListView
from apps.narrations.views import \
    NarrationDetailsView as APINarrationDetailsView
from apps.narrations.views import \
    NarrationsListView as APINarrationsListView
from apps.narrations.views import \
    NarratorsListView as APINarratorsListView
from apps.narrations.views import \
    PlaylistViewSet as APIPlaylistViewSet
from apps.narrations.views import \
    UrlWordCountView as APIUrlWordCountView
from apps.player.views import (AudioHubView, ItemLibraryView, LibraryPageView,
                               PlaylistLibraryView, SubcategoryView)
from apps.player.views import player as player_js_view
from apps.sales.views import (AdditionalServicesListView, BillingListView,
                              CreateOrderView, ValidatePromoCode, AtriumPayment)
from apps.users.views import (CurrentUserView, NotificationsViewSet,
                              UserDetailsView)
import apps.dashboard.django_dash

router = routers.DefaultRouter()
router.register(r'notifications', NotificationsViewSet)
router.register(r'playlists', APIPlaylistViewSet)

api_urlpatterns = (
    [
        path('me/', CurrentUserView.as_view(), name='current_user'),
        path('narrator/', APINarratorsListView.as_view(), name='narrators'),
        path('narrations/', APINarrationsListView.as_view(),
             name='narrations'),
        path('narrations/<int:pk>',
             APINarrationDetailsView.as_view(),
             name='narration_details'),
        path('word-count/', APIUrlWordCountView.as_view(), name='word_count'),
        path('order-prev/',
             CreateOrderView.as_view(),
             name='narrations_order-prev'),
        path('order/', CreateOrderView.as_view(), name='narrations_order'),
        path('validate-promo-code/',
             ValidatePromoCode.as_view(),
             name='validate_promo_code'),
        path('user-details/', UserDetailsView.as_view(), name='user_details'),
        path('billing/', BillingListView.as_view(), name='billing'),
        path('additional-services/',
             AdditionalServicesListView.as_view(),
             name='services'),
        path('subcategory/', SubcategoryView.as_view(), name='subcategories'),
        # path('analytics/plays/', PlaysStatsListView.as_view(),
        # name='analytics'),
        path('rest-auth/', include('rest_auth.urls')),
        path(r'api-token-auth/', obtain_jwt_token),
        path(r'api-token-verify/', verify_jwt_token),

        path('mailinglist/', MailingListView.as_view()),

        path('', include(router.urls)),
    ],
    'api')

dashboard_patterns = (
    [
        # path(r'', TemplateView.as_view(template_name='react_index.html'),
        # name='home'),
        path(r'order-prev/',
             TemplateView.as_view(template_name='react_index.html'),
             name='order_narrationsprev'),
        path(r'order/',
             TemplateView.as_view(template_name='react_index.html'),
             name='order_narrations'),
        path(r'payment/',
             TemplateView.as_view(template_name='react_index.html'),
             name='payment'),
        path(r'thankyou/',
             TemplateView.as_view(template_name='react_index.html'),
             name='order_complete'),
        path(r'narrations/',
             TemplateView.as_view(template_name='react_index.html'),
             name='narrations_list'),
        path(r'narrations/<int:id>',
             TemplateView.as_view(template_name='react_index.html'),
             name='narration_details'),
        path(r'playlists/',
             TemplateView.as_view(template_name='react_index.html'),
             name='playlists_list'),
        path(r'playlists/<int:id>',
             TemplateView.as_view(template_name='react_index.html'),
             name='playlist_details'),
        path(r'playlists/new',
             TemplateView.as_view(template_name='react_index.html'),
             name='new_playlist'),
        path(r'distribution/',
             TemplateView.as_view(template_name='react_index.html'),
             name='distribution'),
        path(r'analytics/', TemplateView.as_view(
        template_name='react_index.html'), name='analytics'),
        path(r'settings/',
             TemplateView.as_view(template_name='react_index.html'),
             name='settings'),
        path(r'billing/',
             TemplateView.as_view(template_name='react_index.html'),
             name='billing'),
        path(r'notifications/',
             TemplateView.as_view(template_name='react_index.html'),
             name='notifications'),
        path(r'password-change/',
             TemplateView.as_view(template_name='react_index.html'),
             name='password-change'),
        path(r'player-customization/',
             TemplateView.as_view(template_name='player_customization.html'),
             name='player-customization'),
    ],
    'dashboard')

client_auth_patterns = ([
    path(r'auth/',
         TemplateView.as_view(template_name='react_index.html'),
         name='auth_root'),
    path(r'auth/login',
         TemplateView.as_view(template_name='react_index.html'),
         name='login'),
    path(r'auth/recover-password',
         TemplateView.as_view(template_name='react_index.html'),
         name='recover_password'),
], 'auth')

urlpatterns = [
    path('accounts/', include('allauth.urls')),

    # path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('users/', include('apps.users.urls', namespace='users')),

    # React frontend support
    path('', include(dashboard_patterns, namespace='dashboard')),
    path('', include(client_auth_patterns, namespace='auth')),

    # DRF API urls
    path('api/v1/', include(api_urlpatterns, namespace='api')),

    # DJ-Stripe
    #path("stripe/", include('djstripe.urls', namespace="djstripe")),

    # Analytics
    # url('analytics/',
    # TemplateView.as_view(template_name='plotly_dash_template.html'),
    # name='analytics'),
    path('cratedb/',
         TemplateView.as_view(template_name='plotly_dash_template.html'),
         name='dash'),
    path('django_plotly_dash/', include('django_plotly_dash.urls')),

    # Uploader
    path("uploader/", include('apps.uploader.urls')),

    # Website
    path(r'', TemplateView.as_view(template_name='index.html'), name='home'),
    path('library/',
         RedirectView.as_view(url='https://voxsnap.com/audiohub/', permanent=True, query_string=True)),
    path('privacy/',
         TemplateView.as_view(template_name='privacy.html'),
         name='privacy'),
    path('terms/',
         TemplateView.as_view(template_name='terms.html'),
         name='terms'),
    path('audiohub/', LibraryPageView.as_view(), name='library'),
    path('audiohub/<slug:customer>', AudioHubView.as_view(), name='audiohub'),

    # Sales inquiry / pricing
    path('pricing/', QuestionaireView.as_view(), name='pricing'),
    path('pricing/packages/', PackagesView.as_view(), name='packages'),
    path('pricing/packages/<package>',
         PackagesView.as_view(),
         name='packages_detail'),
    path('thank-you/',
         TemplateView.as_view(template_name='thank_you.html'),
         name='thank_you'),
    path('order-failed/', TemplateView.as_view(template_name='sales_custom/order-failed.html'), name='order-failed'),

    # Custom orders
    path('payment/atrium/', TemplateView.as_view(template_name='sales_custom/atrium.html')),
    path('payment/order/atrium/', AtriumPayment.as_view()),

    # Tim Draper book
    path('tim-draper/',
         TimDraperPlaylistView.as_view(),
         name='tim_draper_playlist'),

    # Blog posts
    path(
        'blog/why-converting-your-posts-to-audio-will-increase-your-'
        'marketing-roi/',
        TemplateView.as_view(
            template_name='blog/converting-posts-to-audio.html')),
    path(
        'blog/how-audio-demand-and-consumption-are-trending-up-and-why-you-'
        'should-be-part-of-it/',
        TemplateView.as_view(
            template_name='blog/audio-demand-trending-up.html')),
    path(
        'blog/how-content-marketing-can-help-you-boost-important-metrics-at-'
        'your-company/',
        TemplateView.as_view(template_name='blog/content-marketing.html')),
    path(
        'blog/voxsnap-launching-our-new-platform-to-transform-text-to-human-'
        'voice/',
        TemplateView.as_view(template_name='blog/new-platform.html')),
    #path('blog/', include('apps.blog.urls')),

    # Old hack for LinkedIn
    path(
        'img/facebook.png',
        RedirectView.as_view(
            url='https://cdn.voxsnap.com/v2/assets/img/facebook.png')),
]

if settings.PRODUCTION:
     urlpatterns += path('nimda/', admin.site.urls),
else:
     urlpatterns += path('admin/', admin.site.urls),

if settings.DEBUG:
    urlpatterns += re_path(r'^api/v1/api-auth/',
                           include('rest_framework.urls')),

    # This is only needed when using runserver.
    urlpatterns = \
        static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
        + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
        + urlpatterns

    # # urls for testing error pages locally
    # from django.views.defaults import page_not_found, server_error
    #
    # errors_testing_patterns = [
    #     # url(r'^400/$', TemplateView.as_view(template_name='400.html')),
    #     # url(r'^403/$', TemplateView.as_view(template_name='403.html')),
    #     url(r'^404/$', page_not_found),
    #     url(r'^500/$', server_error),
    # ]
    #
    # urlpatterns += [
    #     url(r'^test-error/', include(errors_testing_patterns)),
    # ]

    if 'debug_toolbar' in settings.INSTALLED_APPS:
        try:
            import debug_toolbar
            urlpatterns += [
                path(r'^__debug__/', include(debug_toolbar.urls)),
            ]
        except ImportError:
            pass
