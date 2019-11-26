from annoying.fields import AutoOneToOneField
from django.conf import settings
from django.core.validators import MaxValueValidator
from django.db import models
from django.utils import timezone
from django.utils.functional import cached_property

from apps.users.models import Customer
from voxsnap.utils.constants import PackageTypes


class UserStripeData(models.Model):
    user = AutoOneToOneField(settings.AUTH_USER_MODEL,
                             primary_key=True,
                             related_name='stripe_data',
                             on_delete=models.CASCADE)
    stripe_id = models.CharField(max_length=255)
    subscription_id = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'User Stripe Data'


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    pack_type = models.CharField(max_length=1,
                                 choices=PackageTypes.PACK_TYPES,
                                 help_text="Package Type")
    quantity = models.PositiveIntegerField(help_text="Narrations Ordered")
    list_all_posts = models.BooleanField(
        help_text="List posts in the VoxSnap Library", default=False)
    created = models.DateTimeField(auto_now_add=True)
    stripe_id = models.CharField(max_length=512, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    promo_code = models.ForeignKey('PromoCode',
                                   related_name='orders',
                                   null=True,
                                   blank=True,
                                   on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f'{self.customer} ({self.narrations.count()} url) ({self.created})'

    @cached_property
    def unit_price(self):
        from voxsnap.utils.sales import get_unit_price
        return get_unit_price(self.quantity, self.pack_type)

    @cached_property
    def discount(self):
        discount = 0
        if self.promo_code:
            if self.promo_code.discount_percent:
                price_float = float(self.price)
                discount = round(
                    self.promo_code.discount_percent * price_float /
                    (100 - self.promo_code.discount_percent), 2)
            elif self.promo_code.discount_fixed:
                # todo if self.price == 0
                discount = self.promo_code.discount_fixed

        return discount


class PromoCode(models.Model):
    # When testing with Stripe create the following code with 25% off
    # TEST_25_OFF which maps to the Stripe coupon id TFRvwa4H

    code = models.CharField(max_length=128, unique=True)
    # we are probably going to never use stripe coupons...
    stripe_coupon_id = models.CharField(max_length=128, blank=True, null=True)
    max_usages = models.IntegerField(blank=True, null=True)
    discount_fixed = models.PositiveIntegerField(blank=True, null=True)
    discount_percent = models.PositiveIntegerField(
        blank=True,
        null=True,
        validators=[
            MaxValueValidator(100),
            # MinValueValidator(1)
        ])
    expiration_date = models.DateField(null=True, blank=True)

    def __str__(self):
        result = self.code

        if self.discount_fixed:
            result += f' [${self.discount_fixed}]'
        if self.discount_percent:
            result += f' [{self.discount_percent}%]'
        if self.max_usages:
            result += f' [max usages: {self.max_usages}]'

        return result

    @property
    def is_valid(self):
        result = False
        if not self.expiration_date and not self.max_usages:  # no limitations
            result = True
        else:
            if self.expiration_date and timezone.now().date(
            ) < self.expiration_date:
                result = True

            if self.max_usages and self.orders.count() < self.max_usages:
                result = True

        return result

    def calculate_discount(self, amount):
        amount = float(amount)
        if self.discount_percent:
            amount_discounted = amount * (100 -
                                          float(self.discount_percent)) / 100
        elif self.discount_fixed:
            amount_discounted = amount - self.discount_fixed
            if amount_discounted < 0:
                amount_discounted = 0

        discount = amount - amount_discounted

        return amount_discounted, discount


class AdditionalService(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title
