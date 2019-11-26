from allauth.account.models import EmailConfirmation, EmailAddress
from allauth.account.utils import setup_user_email
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.validators import EmailValidator, MinValueValidator
from django.core.mail import mail_managers
from django.template.loader import render_to_string
from django.db import transaction, IntegrityError
from django.urls import reverse
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from voxsnap.utils.constants import AdditionalServices, PackageTypes, ORDER_REGISTRATION_MESSAGE_SUBJECT
from voxsnap.utils.mail import notify_users
from voxsnap.utils.sales import calculate_order_total, calculate_additional_amount, OrderCreationException, \
    create_stripe_customer, create_stripe_charge, create_stripe_subscription, create_subscription_invoice
from voxsnap.utils.serializer_fields import CastingIntegerField
from apps.users.models import Customer
from apps.narrations.models import Narration
from apps.users.serializers import CustomerSerializer
from apps.narrations.serializers import NarrationCreationSerializer
from .models import Order, PromoCode, AdditionalService

### WE NEED TO REWRITE EVERYTHING HERE ###

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrderShortSerializer(OrderSerializer):
    class Meta(OrderSerializer.Meta):
        fields = ['id', 'created', 'price', 'notes']


class OrderCreationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True,
                                   validators=[EmailValidator])
    your_name = serializers.CharField(write_only=True)
    narrations = NarrationCreationSerializer(many=True)
    stripe_token = serializers.CharField(write_only=True)
    package = serializers.CharField(write_only=True)
    narrations_count = CastingIntegerField(write_only=True,
                                           validators=[MinValueValidator(0)])

    customer = CustomerSerializer(write_only=True)

    _additional_order_email_context = {}

    class Meta:
        model = Order
        exclude = ['user', 'quantity']

    def _process_additional_services(self, customer_data):
        additional_services_applied = []
        customer_data_with_services = customer_data  # incoming data copy to keep the method/function pure

        if 'additional_services' in customer_data:
            additional_services = customer_data_with_services.pop(
                'additional_services')
            for service_id in additional_services:
                if service_id in AdditionalServices.SERVICES_ENABLED:
                    customer_data_with_services[service_id] = True
                    additional_services_applied.append(service_id)

        return customer_data_with_services, additional_services_applied

    def _process_user_info(self, email_address, first_name, stripe_token,
                           customer_data):
        try:
            user, created = get_user_model().objects.get_or_create(
                email=email_address, defaults={'first_name': first_name})
            if created or not user.stripe_data.stripe_id:
                stripe_customer_data = create_stripe_customer(
                    user.email, stripe_token)
                user.stripe_data.stripe_id = stripe_customer_data.id
                user.stripe_data.save()

            if created or user.customer is None:
                new_customer = Customer.objects.create(**customer_data)
                user.customer = new_customer
                user.save()
        except IntegrityError:
            raise ValidationError('New user creation error')

        return user

    def _success_email_notifications(self, user, new_order):
        confirmation = None
        user_message_context = {
            'order': new_order,
        }

        user_requires_confirmation = not EmailAddress.objects.filter(
            user=user).exists()
        if settings.NEW_USERS_CONFIRMATION_ENABLED and user_requires_confirmation:
            # Email notification to new user with activation link
            email_object = setup_user_email(self.context['request'], user, [])
            confirmation = EmailConfirmation.create(email_object)
            confirmation_link = reverse('users:user_confirm_email',
                                        kwargs={'key': confirmation.key})

            user_message_context['confirmation_link'] = confirmation_link

        user_message_context.update(self._additional_order_email_context)

        notify_users([user], ORDER_REGISTRATION_MESSAGE_SUBJECT,
                     'sales/email/order_registration.txt',
                     'sales/email/order_registration.html',
                     user_message_context)

        if settings.NEW_USERS_CONFIRMATION_ENABLED and user_requires_confirmation:
            # allauth.account.models.EmailConfirmation#send
            confirmation.sent = timezone.now()
            confirmation.save()

        admin_content = render_to_string('sales/email/order_alert.txt',
                                         user_message_context)
        mail_managers("New Order from " + new_order.user.customer.company_name,
                      admin_content)

    def _prepare_order_data_structures(self, validated_data):
        # http://www.django-rest-framework.org/api-guide/relations/#writable-nested-serializers
        if 'narrations' in validated_data:
            narrations_data = validated_data.pop('narrations')
        else:
            narrations_data = []

        # this is garbage but it works for now
        narr_count = 0
        package = validated_data.pop('package')
        if package == "starter":
            narr_count = 4
        elif package == "advanced":
            narr_count = 8
        elif package == "complete":
            narr_count = 20

        quantity = max(narr_count, len(narrations_data))
        validated_data['quantity'] = quantity
        new_order = super().create(validated_data)

        narrations_meta = {}
        for narration_data in narrations_data:
            if validated_data.get('list_all_posts'):
                narration_data['public_library'] = True

            new_narration = Narration.objects.create(order=new_order,
                                                     **narration_data)
            narrations_meta[
                f'narration-{new_narration.pk}'] = new_narration.url

        # if we have unused narrations add them to the customer credit
        if narr_count > len(narrations_data):
            new_order.user.customer.narrations_available += narr_count - len(
                narrations_data)
            new_order.user.customer.save()

        return new_order, narrations_data, narrations_meta

    def _process_payment(self, new_order, new_user,
                         additional_services_applied, narrations_data,
                         narrations_meta):
        amount_to_charge, unit_price, additional_services_total, additional_services_data = calculate_order_total(
            new_order.quantity, new_order.pack_type, new_order.promo_code,
            additional_services_applied)
        additional_amount, narrations_extra_data = calculate_additional_amount(
            new_order.quantity, narrations_data, new_order.pack_type,
            new_order.promo_code)

        self._additional_order_email_context.update({
            'additional_amount':
            additional_amount,
            'narrations_context_data':
            narrations_extra_data,
            'additional_services_data':
            additional_services_data
        })

        additional_services_meta = {
            'additional_services': str(additional_services_applied)
        }
        customer = new_order.user.customer
        order_meta = {
            'company': customer.company_name,
            'phone': customer.phone_number,
            'quantity': new_order.quantity,
            'email': new_user.email,
            'blog_platform': customer.get_blogging_platforms_display(),
            'promo_code': new_order.promo_code,
        }
        order_meta.update(narrations_meta)

        try:
            if new_order.pack_type == PackageTypes.ONE_TIME:
                # one-time Stripe payment
                order_meta.update(additional_services_meta)
                amount_to_charge += additional_amount + additional_services_total
                charge_info = create_stripe_charge(
                    new_user.stripe_data.stripe_id, amount_to_charge, 'VoxSnap Narrations',
                    order_meta)
                new_order.stripe_id = charge_info.id
                new_order.price = amount_to_charge

            elif new_order.pack_type == PackageTypes.MONTHLY:
                # Stripe subscription
                subscription = create_stripe_subscription(
                    new_user, amount_to_charge, order_meta)
                new_user.stripe_data.subscription_id = subscription.id
                new_user.stripe_data.save()

                new_order.stripe_id = subscription.id
                new_order.price = amount_to_charge + additional_amount + additional_services_total

                # separate invoice for additional services (not a part of monthly subscription)
                # create_subscription_invoice(
                #     additional_services_total, new_user.stripe_data.stripe_id,
                #     subscription.id,
                #     'Additional services payment for VoxSnap order',
                #     additional_services_meta)

                # extra_narrations_meta = dict()
                # for index, narration_data in enumerate(narrations_extra_data):
                #     extra_narrations_meta[
                #         f'narration-{index}-url'] = narration_data['url']
                #     extra_narrations_meta[
                #         f'narration-{index}-word-count'] = narration_data[
                #             'word_count']

                # create an invoice for additional_amount (posts with >800 words)
                # https://stripe.com/docs/subscriptions/quantities#dynamic-billing-amounts
                # create_subscription_invoice(
                #     additional_amount, new_user.stripe_data.stripe_id,
                #     subscription.id,
                #     'Additional payment for VoxSnap order (> 800 words posts)',
                #     extra_narrations_meta)
            else:
                # todo trigger an error - unknown pack_type
                pass

            new_order.save()

        except OrderCreationException as e:
            raise ValidationError(e)

    @transaction.atomic
    def create(self, validated_data):
        user_email = validated_data.pop('email')
        user_name = validated_data.pop('your_name')
        stripe_token = validated_data.pop('stripe_token')
        customer_data = validated_data.pop('customer')

        customer_data_with_services, additional_services_applied = self._process_additional_services(
            customer_data)

        order_user = self._process_user_info(user_email, user_name,
                                             stripe_token,
                                             customer_data_with_services)
        # validated_data['user'] = self.context['request'].user
        validated_data['user'] = order_user
        validated_data['customer'] = order_user.customer

        new_order, narrations_data, narrations_meta = self._prepare_order_data_structures(
            validated_data)

        self._process_payment(new_order, order_user,
                              additional_services_applied, narrations_data,
                              narrations_meta)

        self._additional_order_email_context['company_name'] = customer_data[
            'company_name']
        self._success_email_notifications(order_user, new_order)

        return new_order


class PromoCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = '__all__'


class PromoCodeShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromoCode
        fields = ['id', 'discount_percent', 'discount_fixed']


class AdditionalServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalService
        fields = '__all__'
