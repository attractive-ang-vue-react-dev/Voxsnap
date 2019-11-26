from allauth.account.forms import SetPasswordForm
from allauth.account.models import EmailConfirmation

from django.contrib.auth import logout, authenticate, login
from django.db.models import Q
from django.http import Http404
from django.utils import timezone
from django.views.generic import FormView

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import \
    RetrieveAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .serializers import \
    UserExtendedSerializer, NotificationsSerializer, CurrentUserSerializer
from .models import Notification


class NewUserConfirmationView(FormView):
    """
    Inspired by allauth.account.views.ConfirmEmailView

    """
    form_class = SetPasswordForm
    confirmation_obj = None
    template_name = 'users/user_post_order_pass_setup.html'
    success_url = '/'
    user = None

    def dispatch(self, request, *args, **kwargs):
        key = self.kwargs['key']
        try:
            self.confirmation_obj = EmailConfirmation.objects.all_valid().get(
                key=key.lower())
            self.user = self.confirmation_obj.email_address.user
        except EmailConfirmation.DoesNotExist:
            raise Http404()

        # log out any previously signed in user
        logout(request)

        return super().dispatch(request, *args, **kwargs)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs["user"] = self.user
        return kwargs

    def form_valid(self, form):
        self.confirmation_obj.confirm(self.request)
        # self.user.is_active = True
        form.save()

        # log new user in
        user = authenticate(email=self.user.email,
                            password=form.cleaned_data['password1'])
        login(self.request, user)

        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)

        ctx['key_user'] = self.user
        return ctx


class CurrentUserView(RetrieveAPIView):
    serializer_class = CurrentUserSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return self.request.user


class UserDetailsView(RetrieveUpdateAPIView):
    serializer_class = UserExtendedSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return self.request.user


class NotificationsPagination(PageNumberPagination):
    page_size = 20


class NotificationsViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()

    serializer_class = NotificationsSerializer
    permission_classes = (IsAuthenticated, )
    pagination_class = NotificationsPagination

    def get_queryset(self):
        if self.action == 'list':
            return self.queryset.filter(
                Q(user=self.request.user) | Q(user__isnull=True))
        else:
            return self.queryset

    @action(detail=False, url_path="unread-count")
    def unread_count(self, request):
        unread_count = Notification.objects.filter(
            user=self.request.user, read_dt__isnull=True).count()
        content = {'unread_count': unread_count}
        return Response(content)

    @action(detail=False, url_path="mark-all-notifications-read")
    def mark_all_notifications_read(self, request):
        notifications = Notification.objects.filter(user=self.request.user,
                                                    read_dt__isnull=True)
        notifications.update(read_dt=timezone.now())
        return Response({"message": "OK"})
