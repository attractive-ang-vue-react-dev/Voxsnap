from django.db.models import Q
from django.db import IntegrityError
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.users.models import Customer
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives, get_connection
from django.shortcuts import redirect
from django.template.loader import render_to_string
import datetime

from voxsnap.utils.sales import validate_promo_code, create_stripe_customer, create_stripe_charge, create_stripe_subscription

from .models import AdditionalService, Order
from .serializers import (AdditionalServiceSerializer, OrderCreationSerializer,
                          OrderShortSerializer, PromoCodeShortSerializer)


class CreateOrderView(CreateAPIView):
    serializer_class = OrderCreationSerializer


class ValidatePromoCode(APIView):
    def post(self, request):
        promo_code_value = request.data.get('code')
        if not promo_code_value:
            content = {
                'error': 'Promo code value in \'code\' key is required.'
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        is_valid, promo_code_obj = validate_promo_code(promo_code_value)
        if is_valid:
            serializer = PromoCodeShortSerializer(promo_code_obj)
            return Response(serializer.data)
        else:
            content = {'error': 'Promo code is invalid'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class BillingListView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderShortSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        qs = super().get_queryset().filter(user=self.request.user)
        query_param = self.request.query_params.get('q')
        if query_param:
            qs = qs.filter((Q(notes__icontains=query_param)
                            | Q(created__icontains=query_param)))
        return qs


class AdditionalServicesListView(ListAPIView):
    queryset = AdditionalService.objects.all()
    serializer_class = AdditionalServiceSerializer

class AtriumPayment(APIView):
    """This is hacked together quickly"""

    def post(self, request, *args, **kwargs):
        email_address = request.data.get('stripeEmail')
        stripe_token = request.data.get('stripeToken')
        company = request.data.get('company')
        phone = request.data.get('phone')
        amount_to_charge = 3750
        order_meta = {}

        try:
            user, created = get_user_model().objects.get_or_create(email=email_address)
            if created or not user.stripe_data.stripe_id:
                stripe_customer_data = create_stripe_customer(
                    user.email, stripe_token)
                user.stripe_data.stripe_id = stripe_customer_data.id
                user.stripe_data.save()

            if created or user.customer is None:
                new_customer, created = Customer.objects.get_or_create(company_name=company)
                user.customer = new_customer
                user.save()
        except IntegrityError:
            raise ValidationError('New user creation error')

        try:
            charge_info = create_stripe_charge(user.stripe_data.stripe_id, amount_to_charge, 'VoxSnap Starter Pack', order_meta)
            #sample monthly subscription
            # subscription = create_stripe_subscription(user, amount_to_charge)
            # user.stripe_data.subscription_id = subscription.id
            # user.stripe_data.save()

            #send email to Customer
            messages = []
            # we lose the charge_info.source.name when dealing with subscriptions, so we need to grab it from the form
            context = {'name': charge_info.source.name,
                       'company': company,
                       'phone': phone,
                       'date': datetime.date.today().strftime("%B %d %Y"),
                       'amount': amount_to_charge}

            customer_receipt = render_to_string('email/atrium_sale.txt', context)
            admin_notification = render_to_string('email/admin_sale_alert.txt', context)

            msg = EmailMultiAlternatives('VoxSnap Order', customer_receipt, to=(email_address,), bcc=('helena@voxsnap.com', 'rob@voxsnap.com'))
            messages.append(msg)
            admin_msg = EmailMultiAlternatives('{0} Paid'.format(company), admin_notification, to=('helena@voxsnap.com', 'rob@voxsnap.com'))
            messages.append(admin_msg)

            connection = get_connection()
            connection.send_messages(messages)

            return redirect('thank_you')
        except Exception as e:
            alert_msg = EmailMultiAlternatives('Problem with order from {}'.format(company), 'Major issue processing transaction: {} args: {}'.format(e, e.args), to=('helena@voxsnap.com', 'rob@voxsnap.com'))
            alert_msg.send()
            failed_kwargs={'extra_context':{'message': str(e)}}
            return redirect('order_failed', **failed_kwargs)
