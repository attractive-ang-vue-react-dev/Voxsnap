from django.conf import settings
from django_hosts import patterns, host


host_patterns = patterns(
    '',
    host(r'', settings.ROOT_URLCONF, name='website'),
    host(r'article', 'voxsnap.hosts.article_urls', name='article'),
    host(r'data', 'voxsnap.hosts.data_urls', name='player'),
    host(r'player', 'voxsnap.hosts.player_urls', name='embedded'),
)
