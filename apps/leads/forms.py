from django import forms
from django.core.mail import mail_managers
from django.template.loader import render_to_string

from .models import PricingLead


class PricingForm(forms.ModelForm):
    package = 'starter'

    def get_package(self):
        if self.cleaned_data['alexa_flash_briefing'] or self.cleaned_data[
                'google_news']:
            self.package = 'advanced'
        if self.cleaned_data['alexa_skill'] or self.cleaned_data[
                'google_action']:
            self.package = 'complete'
        if self.cleaned_data['thirdparty_integration']:
            self.package = 'custom'
        return self.package

    def send_email(self):
        lead_context = {'lead': self.cleaned_data}
        admin_content = render_to_string('leads/email/lead_alert.txt',
                                         lead_context)
        mail_managers("New Lead", admin_content)

    class Meta:
        model = PricingLead
        fields = ('email', 'alexa_flash_briefing', 'alexa_skill',
                  'google_action', 'google_news', 'narrations_needed',
                  'podcast_distribution', 'thirdparty_integration')


class PackageForm(forms.ModelForm):
    class Meta:
        model = PricingLead
        fields = ('email', 'full_name', 'company', 'message')
