from .base import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

#sentry_sdk.init(
#    dsn="https://secret_key@sentry.io/project_id",
#    integrations=[DjangoIntegration()]
#)

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = ''

DEBUG = True
THUMBNAIL_DEBUG = DEBUG
PRODUCTION = False

# fix issue on Google Cloud, adds invalid plugin path so we just use
# our own boto.cfg
#os.environ['BOTO_CONFIG'] = BASE_DIR + 'voxsnap/settings/boto.cfg'

COMPRESS_ENABLED = False

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.voxsnap.test', 'voxsnap.test']
PARENT_HOST = 'voxsnap.test:8000'
HOST_SCHEME = 'http'

MANAGERS = [('Your Name', 'your.email@voxsnap.com')]

INSTALLED_APPS += [
    'django_extensions',
    # 'debug_toolbar',
    # 'django_jenkins',
]

# JENKINS_TASKS = (
#     'django_jenkins.tasks.run_pylint',
#     'django_jenkins.tasks.run_pep8',
#     'django_jenkins.tasks.run_pyflakes',
#     'django_jenkins.tasks.run_flake8',
# )

# https://github.com/kmmbvnr/django-jenkins#settings
PROJECT_APPS = ('some_app', )

MIDDLEWARE += [
    # 'debug_toolbar.middleware.DebugToolbarMiddleware'
]

# Debug toolbar
# INTERNAL_IPS = ['127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'HOST': 'localhost',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'PORT': '5432'
    },
    'analytics': {
        'ENGINE': 'cratedb.backends.postgresql',
        'NAME': 'voxsnap',
        'HOST': 'localhost',
        'USER': 'crate',
        'PASSWORD': '',
        'PORT': '5442'
    }
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://localhost:6379/0",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    },
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"

EMAIL_BACKEND = 'django_ses.SESBackend'
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

AWS_SES_REGION_NAME = 'us-west-2'
AWS_SES_REGION_ENDPOINT = 'email.us-west-2.amazonaws.com'
DEFAULT_FROM_EMAIL='order@voxsnap.com'
SERVER_EMAIL='order@voxsnap.com'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_HOST_USER = 'your-username@gmail.com'
# EMAIL_HOST_PASSWORD = 'your-password'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True

COMPRESS_PRECOMPILERS = (
    ('text/x-scss', 'django_libsass.SassCompiler'),
    # ('text/x-scss', 'django_pyscss.compressor.DjangoScssFilter'),
    # ('text/x-scss', 'sass --style compressed {infile} {outfile}'),
)

# Celery
BROKER_URL = 'amqp://guest:guest@localhost:5672//'
CELERY_RESULT_BACKEND = 'amqp'
# BROKER_URL = 'redis://localhost:6379/1'
# CELERY_RESULT_BACKEND = 'redis://localhost:6379/1'
CELERY_TASK_RESULT_EXPIRES = 18000
CELERY_ACCEPT_CONTENT = ['pickle', 'json', 'msgpack', 'yaml']
# CELERY_ALWAYS_EAGER = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format':
            '%(levelname)s %(asctime)s %(module)s %(process)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'verbose_console': {
            'level': 'DEBUG',
            # 'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        # 'file': {
        #     'level': 'DEBUG',
        #     'class': 'logging.handlers.RotatingFileHandler',
        #     'filename': '/path/to/django/debug.log',
        # },
    },
    'loggers': {
        'some_logger': {
            'handlers': ['verbose_console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

STRIPE_LIVE_PUBLIC_KEY = os.environ.get("STRIPE_LIVE_PUBLIC_KEY",
                                        "pk_live_YOUR_LIVE_PUBLIC_KEY")
STRIPE_LIVE_SECRET_KEY = os.environ.get("STRIPE_LIVE_SECRET_KEY",
                                        "sk_live_YOUR_LIVE_SECRET_KEY")
STRIPE_TEST_PUBLIC_KEY = os.environ.get("STRIPE_TEST_PUBLIC_KEY",
                                        "pk_test_YOUR_TEST_PUBLIC_KEY")
STRIPE_TEST_SECRET_KEY = os.environ.get("STRIPE_TEST_SECRET_KEY",
                                        "sk_test_YOUR_TEST_SECRET_KEY")
STRIPE_LIVE_MODE = False  # Change to True in production
DJSTRIPE_WEBHOOK_SECRET = "whsec_xxx"  # Get it from the section in the Stripe dashboard where you added the webhook endpoint

STRIPE_PUBLIC_KEY = STRIPE_LIVE_PUBLIC_KEY if STRIPE_LIVE_MODE else STRIPE_TEST_PUBLIC_KEY
STRIPE_SECRET_KEY = STRIPE_LIVE_SECRET_KEY if STRIPE_LIVE_MODE else STRIPE_TEST_SECRET_KEY
STRIPE_MONTHLY_SUBSCRIPTION_ID = "1_dollar_monthly"  # be sure to create a new subscription object at Stripe dashboard

############ Bucket and creds
CLOUDFRONT_DOMAIN = "assets.voxsnap.com"
AWS_STORAGE_BUCKET_NAME = 'voxsnap'
AWS_ACCESS_KEY_ID = 'AKIA...'
AWS_SECRET_ACCESS_KEY = 'secret_key_here'

########### Optional settings

# tells AWS to add properties to the files, such that when they
# get served from s3 they come with this header telling the browser to cache for
# life
AWS_HEADERS = {
    'Cache-Control': 'max-age=2592000',
}
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
# Set to True to make sure that only changed files are uploaded with collectstatic
AWS_PRELOAD_METADATA = False

#http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
# allows authenticating with creds in querystring for temp access to a resource
# Setting to False if not needed helps get rid of uwanted qstrings in compressed
# output
AWS_QUERYSTRING_AUTH = False

# if you don't need these
AWS_S3_SECURE_URLS = True
AWS_S3_ENCRYPTION = False

AWS_S3_CUSTOM_DOMAIN = CLOUDFRONT_DOMAIN

# Static storage
STATIC_URL = "/static/"
#STATIC_URL = "https://assets.voxsnap.com/static/"
STATICFILES_LOCATION = 'static'
#STATICFILES_STORAGE = 'voxsnap.utils.custom_storages.StaticStorage'
COMPRESS_URL = STATIC_URL
COMPRESS_ROOT = os.path.join(BASE_DIR, '../', 'assets/src')

# Media storage
MEDIA_URL = "/media/"
#MEDIA_URL = "https://assets.voxsnap.com/media/"
MEDIAFILES_LOCATION = 'media'
#DEFAULT_FILE_STORAGE = 'voxsnap.utils.custom_storages.MediaStorage'

NEW_USERS_CONFIRMATION_ENABLED = False

PLAYS_STATS_PERIOD = 3  # default period (in hours) for plays statistics data aggregation

USE_TZ=False
TIME_ZONE='UTC'
