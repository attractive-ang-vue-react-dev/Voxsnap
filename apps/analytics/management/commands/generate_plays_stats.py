from datetime import timedelta
import random

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

# from apps.analytics.models import PlaysStats
from apps.users.models import Customer


class Command(BaseCommand):
    help = 'Test command to generate test plays stats data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--delete-existing',
            action='store_true',
            dest='cleanup',
            help='Cleanup all the existing plays stats data in the database')

    def handle(self, *args, **options):
        # if options['cleanup']:
        #     PlaysStats.objects.all().delete()      # uncomment if you want to cleanup the existing stats initially

        # stats_period = settings.PLAYS_STATS_PERIOD
        # customers = Customer.objects.all()

        # start_stats_date = timezone.now() - timedelta(days=70)
        # current_stats_dt = start_stats_date

        # while current_stats_dt < timezone.now():
        #     for customer in customers:
        #         plays = random.choice(range(50))

        #         PlaysStats.objects.create(
        #             customer=customer,
        #             dt=current_stats_dt,
        #             plays=plays,
        #         )
        #     current_stats_dt += timedelta(hours=stats_period)

        # self.stdout.write(self.style.SUCCESS(f'Successfully generated stats for {len(customers)} customer accounts'))
        self.stdout.write(
            self.style.SUCCESS(
                f'Didnt actually do anything, please use sample dataset in cratedb'
            ))
