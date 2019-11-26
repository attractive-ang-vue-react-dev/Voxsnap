from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView, FormView
from django.urls import reverse, reverse_lazy
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import PricingLead
from .forms import PricingForm, PackageForm
from .serializers import MailingListSerializer


class QuestionaireView(FormView):
    template_name = 'pricing.html'
    form_class = PricingForm

    package = 'starter'

    def get_success_url(self):
        return reverse_lazy('packages_detail',
                            kwargs={'package': self.package})

    def form_valid(self, form):
        form.send_email()
        self.package = form.get_package()
        form.instance.package = self.package
        form.save()

        response = HttpResponseRedirect(self.get_success_url())
        response.set_cookie("lead", form.instance.uuid)
        return response


class PackagesView(FormView):
    template_name = 'packages.html'
    form_class = PackageForm

    def get_success_url(self):
        return reverse_lazy('thank_you')

    def get(self, request, *args, **kwargs):
        #form = self.form_class(initial=self.initial)

        data = {}
        lead = None

        if request.COOKIES.get('lead'):
            lead = PricingLead.objects.get(
                uuid=request.COOKIES.get('lead'))  # just an example
            data = {'id': lead.id, 'uuid': lead.uuid}

        form = PackageForm(initial=data)
        return render(request, self.template_name, {
            'form': form,
            'lead': lead,
            'view': self
        })


class TimDraperPlaylistView(TemplateView):
    template_name = 'tim_draper_playlist.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['registered'] = True
        return context


class MailingListView(CreateAPIView):
    serializer_class = MailingListSerializer

    def get_ip(self):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR',None)
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = self.request.META.get('REMOTE_ADDR',None)
        return ip

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(ip_addr=self.get_ip())
        resp = Response(serializer.data, status=status.HTTP_200_OK)
        resp.set_cookie('llist', 'r', max_age=15552000)
        return resp
