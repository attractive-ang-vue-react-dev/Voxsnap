from django.contrib.sites.models import Site
from django.core.mail import EmailMultiAlternatives, get_connection
from django.template.loader import render_to_string


def notify_users(users_to_notify,
                 subject,
                 text_template,
                 html_template,
                 additional_context=None):
    messages = []
    current_site = Site.objects.get_current(
    )  # todo request-based current site?

    for user in users_to_notify:
        context = {
            'site': current_site,
            'user': user,
        }

        if additional_context is not None:
            context.update(additional_context)

        # don't forget to set settings.DEFAULT_FROM_EMAIL
        # as well as a proper domain and name settings for Site object in the admin section
        text_content = render_to_string(text_template, context)
        html_content = render_to_string(html_template, context)

        msg = EmailMultiAlternatives(subject, text_content, to=[user.email])
        #msg.attach_alternative(html_content, "text/html")

        messages.append(msg)

    connection = get_connection()
    connection.send_messages(messages)
