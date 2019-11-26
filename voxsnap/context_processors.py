from django.conf import settings


def head_body_settings(request):
    # settings-file located code blocks to be inserted before closing 'head' and 'body' tags respectively
    context = dict()

    try:
        context['HEAD_CLOSING'] = settings.HEAD_CLOSING
    except AttributeError:
        pass

    try:
        context['BODY_CLOSING'] = settings.BODY_CLOSING
    except AttributeError:
        pass

    try:
        context['PRODUCTION'] = settings.PRODUCTION
    except AttributeError:
        pass

    return context


def stripe_keys(request):
    # settings-file located code blocks to be inserted before closing 'head' and 'body' tags respectively
    context = dict()

    try:
        context['STRIPE_PUBLIC_KEY'] = settings.STRIPE_PUBLIC_KEY
    except AttributeError:
        pass

    try:
        context['STRIPE_SECRET_KEY'] = settings.STRIPE_SECRET_KEY
    except AttributeError:
        pass

    return context
