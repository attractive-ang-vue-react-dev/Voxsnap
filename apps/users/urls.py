from django.urls import path, re_path

from .views import NewUserConfirmationView

app_name = 'apps.users'
urlpatterns = [
    # path('', SomeView.as_view(), name='some_view'),
    re_path(r"^user-set-password/(?P<key>[-:\w]+)/$",
            NewUserConfirmationView.as_view(),
            name="user_confirm_email"),
]
