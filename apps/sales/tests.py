from unittest import skipIf

from allauth.account.forms import SetPasswordForm
from allauth.account.models import EmailConfirmation
from django.conf import settings
from django.contrib import auth
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.contrib.sites.models import Site
from django.core import mail
from django.template.loader import render_to_string
from django.urls import reverse
from rest_framework import status
import stripe

from apps.narrations.models import Narration, Narrator
from voxsnap.utils.constants import (ADDITIONAL_WORDS_PRICES,
                                     ORDER_REGISTRATION_MESSAGE_SUBJECT,
                                     PACKAGE_PRICES, AdditionalServices,
                                     BloggingPlatforms, PackageTypes)
from voxsnap.utils.narrations import calculate_article_word_count
from voxsnap.utils.tests import TestCaseWithUsers

from .models import Order, PromoCode

stripe.api_key = settings.STRIPE_SECRET_KEY


class NarrationsTestCase(TestCaseWithUsers):
    initial_users_count = 4

    def setUp(self):
        super().setUp()

        self.create_order_url = reverse('api:narrations_order')
        self.narrator_1 = Narrator.objects.create(first_name="New",
                                                  last_name="Narrator")
        self.test_article_1_url = "https://stripe.com/docs/subscriptions/quantities"  # 736 words article
        self.test_article_2_url = "https://blog.sentry.io/2017/12/05/introducing-saml"  # 933 words article
        self.narrations_context_data = [{
            'url': self.test_article_1_url,
            'word_count': 736
        }, {
            'url': self.test_article_2_url,
            'word_count': 933
        }]

    def tearDown(self):
        # cleanup Stripe test data
        for user in get_user_model().objects.all():
            if user.stripe_data.stripe_id:
                cu = stripe.Customer.retrieve(user.stripe_data.stripe_id)
                cu.delete()

    def _send_data_to_create_order_api(self,
                                       new_user_email,
                                       new_user_name,
                                       pack_type=PackageTypes.MONTHLY,
                                       narrations_count=5,
                                       additional_services=[],
                                       promo_code_pk=None,
                                       additional_narrations=[]):
        default_narrations = [
            {
                "url": self.test_article_1_url,
                "narrator": self.narrator_1.pk,
                "notes": "some note to narration data "
            },
            {
                "url": self.test_article_2_url,
                "narrator": self.narrator_1.pk,
                "notes": "some note for second narration"
            },
        ]

        narrations = default_narrations + additional_narrations

        new_order_data = {
            'your_name': new_user_name,
            'email': new_user_email,
            'pack_type': pack_type,
            'narrations_count': narrations_count,
            'narrations': narrations,
            'customer': {
                'company_name': "Company name",
                'phone_number': "+123456789",
                'blogging_platforms': BloggingPlatforms.WORDPRESS,
                'additional_services': additional_services,
            },
            'list_all_posts': True,
            'stripe_token': 'tok_visa',
            'promo_code': promo_code_pk
        }

        return self.client.post(self.create_order_url,
                                new_order_data,
                                format='json')

    def test_articles_word_count(self):
        self.assertEqual(calculate_article_word_count(self.test_article_1_url),
                         736)
        self.assertEqual(calculate_article_word_count(self.test_article_2_url),
                         933)

    def test_order_narrations_api_view(self):
        # make sure default Stripe monthly plan is set up with the amount of 1 cent
        stripe_monthly_plan = stripe.Plan.retrieve(
            settings.STRIPE_MONTHLY_SUBSCRIPTION_ID)
        self.assertEqual(stripe_monthly_plan.amount, 1)

        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count)
        self.assertEqual(len(mail.outbox), 0)

        new_user_email = "some.address@mail.com"
        new_user_name = "Some New Name"

        post_2_word_count = 933
        post_2_extra_words_cost = round(
            (post_2_word_count - 800) *
            ADDITIONAL_WORDS_PRICES[PackageTypes.MONTHLY][5], 2)
        expected_additional_services_price = AdditionalServices.PRICES[AdditionalServices.ITUNES] \
            + AdditionalServices.PRICES[AdditionalServices.GOOGLE]
        expected_order_price = 5 * PACKAGE_PRICES[PackageTypes.MONTHLY][5] + post_2_extra_words_cost \
            + expected_additional_services_price

        response = self._send_data_to_create_order_api(
            new_user_email,
            new_user_name,
            additional_services=[
                AdditionalServices.ITUNES, AdditionalServices.GOOGLE, ''
            ])

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(float(response.data.get('price')),
                         expected_order_price)

        # new user was created
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count + 1)
        self.assertTrue(
            get_user_model().objects.filter(email=new_user_email).exists())

        new_user = get_user_model().objects.get(email=new_user_email)
        self.assertEqual(new_user.first_name, new_user_name)
        # new user should be active immediately
        self.assertTrue(new_user.is_active)

        # assert user stripe info not empty
        self.assertIsNotNone(new_user.stripe_data.stripe_id)
        self.assertIsNotNone(new_user.stripe_data.subscription_id)

        expected_subscription_price = round(expected_order_price -
                                            post_2_extra_words_cost -
                                            expected_additional_services_price)

        stripe_subscription = stripe.Subscription.retrieve(
            new_user.stripe_data.subscription_id)
        self.assertEqual(stripe_subscription.customer,
                         new_user.stripe_data.stripe_id)
        self.assertEqual(stripe_subscription.plan.id,
                         settings.STRIPE_MONTHLY_SUBSCRIPTION_ID)
        self.assertEqual(stripe_subscription.quantity,
                         expected_subscription_price * 100)

        user_upcoming_invoices = stripe.Invoice.upcoming(
            customer=new_user.stripe_data.stripe_id)
        self.assertEqual(user_upcoming_invoices.amount_due,
                         int(expected_order_price * 100))
        self.assertEqual(user_upcoming_invoices.lines.data[0]['amount'],
                         post_2_extra_words_cost * 100)
        self.assertEqual(user_upcoming_invoices.lines.data[1]['amount'],
                         expected_additional_services_price * 100)
        self.assertEqual(user_upcoming_invoices.lines.data[2]['amount'],
                         expected_subscription_price * 100)

        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(Narration.objects.count(), 2)
        self.assertIsNotNone(Narration.objects.first().order)

        new_order = Order.objects.first()

        self.assertIsNotNone(new_order.stripe_id)
        self.assertEqual(new_order.stripe_id, stripe_subscription.id)

        customer = new_order.user.customer
        self.assertTrue(customer.itunes_podcasts)
        self.assertFalse(customer.amazon_alexa)
        self.assertTrue(customer.google_podcasts)
        self.assertEqual(customer.blogging_platforms,
                         BloggingPlatforms.WORDPRESS)

        # Test that one message has been sent to the customer and one to site managers
        self.assertEqual(len(mail.outbox), 1 + len(settings.MANAGERS))

        # Verify that the subject of outbox messages are correct.
        self.assertEqual(mail.outbox[0].subject,
                         ORDER_REGISTRATION_MESSAGE_SUBJECT)
        self.assertEqual(mail.outbox[0].to, [new_user_email])

        expected_message_context = dict(
            order=new_order,
            site=Site.objects.get_current(),
            additional_amount=post_2_extra_words_cost,
            company_name="Company name",
            narrations_context_data=self.narrations_context_data,
            additional_services_data=[
                {
                    'title':
                    AdditionalServices.DESCRIPTIONS[AdditionalServices.ITUNES],
                    'price':
                    AdditionalServices.PRICES[AdditionalServices.ITUNES]
                },
                {
                    'title':
                    AdditionalServices.DESCRIPTIONS[AdditionalServices.GOOGLE],
                    'price':
                    AdditionalServices.PRICES[AdditionalServices.GOOGLE]
                },
            ])
        if settings.NEW_USERS_CONFIRMATION_ENABLED:
            # the key and url for specific agent invitation
            confirmation_key = EmailConfirmation.objects.get(
                email_address__email=new_user_email).key
            confirmation_link = reverse('users:user_confirm_email',
                                        kwargs={'key': confirmation_key})
            expected_message_context['confirmation_link'] = confirmation_link

        # invitation email contains correct data
        self.assertEqual(
            mail.outbox[0].body,
            render_to_string('sales/email/order_registration.txt',
                             expected_message_context))

    def test_one_time_order(self):
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count)
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(Narration.objects.count(), 0)

        new_user_email = "some.address@mail.com"
        new_user_name = "Some New Name"
        post_2_word_count = 933
        post_2_extra_words_cost = round(
            (post_2_word_count - 800) *
            ADDITIONAL_WORDS_PRICES[PackageTypes.ONE_TIME][5], 2)
        expected_order_price = 5 * PACKAGE_PRICES[PackageTypes.ONE_TIME][5] \
            + AdditionalServices.PRICES[AdditionalServices.ITUNES] \
            + AdditionalServices.PRICES[AdditionalServices.GOOGLE] \
            + post_2_extra_words_cost

        response = self._send_data_to_create_order_api(
            new_user_email,
            new_user_name,
            PackageTypes.ONE_TIME,
            additional_services=[
                AdditionalServices.ITUNES, AdditionalServices.GOOGLE
            ])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count + 1)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(Narration.objects.count(), 2)

        new_user = get_user_model().objects.get(email=new_user_email)

        self.assertIsNotNone(new_user.stripe_data.stripe_id)
        self.assertIsNone(new_user.stripe_data.subscription_id)

        new_order = Order.objects.first()

        self.assertIsNotNone(new_order.stripe_id)

        stripe_charge = stripe.Charge.retrieve(new_order.stripe_id)
        self.assertEqual(stripe_charge.customer,
                         new_user.stripe_data.stripe_id)
        self.assertEqual(stripe_charge.amount, expected_order_price * 100)

    def test_different_narrations_counts(self):
        new_user_email = "some.address@mail.com"
        new_user_name = "Some New Name"
        post_2_word_count = 933

        # "Narrations package" selected / adapted by frontend form = 2
        pack_narrations = 1
        narrations_count = 2

        post_2_extra_words_cost = round(
            (post_2_word_count - 800) *
            ADDITIONAL_WORDS_PRICES[PackageTypes.ONE_TIME][pack_narrations], 2)
        # "package narrations number" is less then the actual number of narrations being sent,
        expected_order_price = 2 * PACKAGE_PRICES[PackageTypes.ONE_TIME][pack_narrations] \
            + AdditionalServices.PRICES[AdditionalServices.ITUNES] \
            + AdditionalServices.PRICES[AdditionalServices.GOOGLE]\
            + post_2_extra_words_cost

        response = self._send_data_to_create_order_api(
            new_user_email, new_user_name, PackageTypes.ONE_TIME,
            narrations_count,
            [AdditionalServices.ITUNES, AdditionalServices.GOOGLE])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        new_order = Order.objects.first()
        self.assertIsNotNone(new_order.stripe_id)

        stripe_charge = stripe.Charge.retrieve(new_order.stripe_id)
        self.assertEqual(stripe_charge.amount,
                         round(expected_order_price, 2) * 100)

        # "Narrations package" = 5
        pack_narrations = 5
        narrations_count = 6
        # add two additional narrations (same 2 urls used twice for now)
        additional_narrations = [
            {
                "url": self.test_article_1_url,
                "narrator": self.narrator_1.pk,
                "notes": "some note to narration data "
            },
            {
                "url": self.test_article_2_url,
                "narrator": self.narrator_1.pk,
                "notes": "some note for second narration"
            },
            {
                "url": self.test_article_1_url,
                "narrator": self.narrator_1.pk,
                "notes": "some note to narration data "
            },
            {
                "url": self.test_article_2_url,
                "narrator": self.narrator_1.pk,
                "notes": "some note for second narration"
            },
        ]

        post_2_extra_words_cost = round(
            (post_2_word_count - 800) *
            ADDITIONAL_WORDS_PRICES[PackageTypes.ONE_TIME][pack_narrations], 2)
        # pack_narrations is less then the actual number of narrations being sent,
        expected_order_price = 6 * PACKAGE_PRICES[PackageTypes.ONE_TIME][pack_narrations] \
            + AdditionalServices.PRICES[AdditionalServices.ITUNES] \
            + AdditionalServices.PRICES[AdditionalServices.GOOGLE]\
            + post_2_extra_words_cost * 3   # long post used 3 times

        response = self._send_data_to_create_order_api(
            new_user_email,
            new_user_name,
            PackageTypes.ONE_TIME,
            narrations_count,
            [AdditionalServices.ITUNES, AdditionalServices.GOOGLE],
            additional_narrations=additional_narrations)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        new_order = Order.objects.last()
        self.assertIsNotNone(new_order.stripe_id)

        stripe_charge = stripe.Charge.retrieve(new_order.stripe_id)
        self.assertEqual(stripe_charge.amount, expected_order_price * 100)

    def test_promo_code_order(self):
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count)
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(Narration.objects.count(), 0)

        discount_percent = 25
        promo_code = PromoCode.objects.create(
            code='TEST_25_OFF', discount_percent=discount_percent)

        new_user_email = "some.address@mail.com"
        new_user_name = "Some New Name"
        post_2_word_count = 933
        post_2_extra_words_cost = round(
            (post_2_word_count - 800) *
            ADDITIONAL_WORDS_PRICES[PackageTypes.ONE_TIME][5], 2)
        post_2_extra_words_discounted_price = round(
            post_2_extra_words_cost * (1 - discount_percent / 100), 2)
        expected_order_price = 5 * PACKAGE_PRICES[PackageTypes.ONE_TIME][5] \
            + post_2_extra_words_cost
        order_discount = round(expected_order_price * (discount_percent / 100),
                               2)
        expected_order_price = round(
            expected_order_price * (1 - discount_percent / 100), 2)

        response = self._send_data_to_create_order_api(
            new_user_email,
            new_user_name,
            PackageTypes.ONE_TIME,
            promo_code_pk=promo_code.pk)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        new_order = Order.objects.first()
        self.assertIsNotNone(new_order.stripe_id)

        stripe_charge = stripe.Charge.retrieve(new_order.stripe_id)
        self.assertEqual(float(new_order.price), expected_order_price)
        self.assertEqual(float(new_order.discount), order_discount)
        self.assertEqual(stripe_charge.amount, expected_order_price * 100)

        expected_message_context = dict(
            order=new_order,
            site=Site.objects.get_current(),
            additional_amount=post_2_extra_words_discounted_price,
            company_name="Company name",
            narrations_context_data=self.narrations_context_data)
        if settings.NEW_USERS_CONFIRMATION_ENABLED:
            # the key and url for specific agent invitation
            confirmation_key = EmailConfirmation.objects.get(
                email_address__email=new_user_email).key
            confirmation_link = reverse('users:user_confirm_email',
                                        kwargs={'key': confirmation_key})
            expected_message_context['confirmation_link'] = confirmation_link

        # notification email contains correct data
        # print('!!!\n', mail.outbox[0].body)
        self.assertEqual(
            mail.outbox[0].body,
            render_to_string('sales/email/order_registration.txt',
                             expected_message_context))

    def test_existing_user_order(self):
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count)
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(Narration.objects.count(), 0)

        # no stripe data is set up for existing user yet
        self.assertEqual(self.user2.stripe_data.stripe_id, '')
        self.assertIsNone(self.user2.stripe_data.subscription_id)

        self.login_user(self.user2)

        user_name = f'{self.user2.first_name} {self.user2.last_name}'
        post_2_word_count = 933
        post_2_extra_words_cost = round(
            (post_2_word_count - 800) *
            ADDITIONAL_WORDS_PRICES[PackageTypes.ONE_TIME][5], 2)
        expected_order_price = 5 * PACKAGE_PRICES[PackageTypes.ONE_TIME][5] \
            + AdditionalServices.PRICES[AdditionalServices.ITUNES] \
            + AdditionalServices.PRICES[AdditionalServices.GOOGLE] \
            + post_2_extra_words_cost

        response = self._send_data_to_create_order_api(
            self.user2.email,
            user_name,
            PackageTypes.ONE_TIME,
            additional_services=[
                AdditionalServices.ITUNES, AdditionalServices.GOOGLE
            ])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # no new users created
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count)
        # new order and 2 narrations in it
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(Narration.objects.count(), 2)

        # stripe data was set up for existing user
        self.user2.stripe_data.refresh_from_db()
        self.assertNotEqual(self.user2.stripe_data.stripe_id, '')
        self.assertIsNone(self.user2.stripe_data.subscription_id)

        new_order = Order.objects.first()

        self.assertIsNotNone(new_order.stripe_id)
        stripe_charge = stripe.Charge.retrieve(new_order.stripe_id)
        self.assertEqual(stripe_charge.customer,
                         self.user2.stripe_data.stripe_id)
        self.assertEqual(stripe_charge.amount, expected_order_price * 100)

    def test_order_narrations_api_view_errors(self):
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count)
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(Narration.objects.count(), 0)

        new_user_email = "some.address@mail.com"
        new_user_name = "Some New Name"

        # trying to provide invalid pack_narrations
        response = self._send_data_to_create_order_api(new_user_email,
                                                       new_user_name,
                                                       narrations_count=0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(list(response.data.keys()), ['narrations_count'])

        # no objects created in db
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count)
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(Narration.objects.count(), 0)

    @skipIf(not settings.NEW_USERS_CONFIRMATION_ENABLED,
            "New users confirmation functionality is disabled")
    def test_user_password_setup_after_order_creation(self):
        new_user_email = "test.user@email.com"
        new_user_name = "Test New User Name"

        invalid_agent_data_pass_mismatch = {
            'password1': '123456789q',
            'password2': '987654321q'
        }
        valid_password_data = {
            'password1': 'somePassword',
            'password2': 'somePassword'
        }

        response = self._send_data_to_create_order_api(new_user_email,
                                                       new_user_name)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Test that one message has been sent to the customer and an alert was sent to admins
        self.assertEqual(len(mail.outbox), 1 + len(settings.MANAGERS))
        self.assertEqual(mail.outbox[0].to, [new_user_email])

        self.login_user(self.user2)

        # the key and url for specific agent invitation
        confirmation_key = EmailConfirmation.objects.get(
            email_address__email=new_user_email).key
        confirmation_link = reverse('users:user_confirm_email',
                                    kwargs={'key': confirmation_key})

        # ERRORS IN FORM DATA

        new_user = get_user_model().objects.get(email=new_user_email)

        # no data
        form = SetPasswordForm(new_user, {})
        self.assertFalse(form.is_valid())
        self.assertEqual(
            form.errors, {
                'password1': [u'This field is required.'],
                'password2': [u'This field is required.'],
            })

        # password repeat mismatch
        form = SetPasswordForm(new_user, invalid_agent_data_pass_mismatch)
        self.assertFalse(form.is_valid())
        self.assertEqual(
            form.errors,
            {'password2': [u'You must type the same password each time.']})

        # self.user2 is still logged in
        self.assertEquals(self.client.request().context['user'], self.user2)

        # View tests

        # check that view returns errors
        response = self.client.post(confirmation_link, {}, format='json')
        # no redirect means that form didn't validate
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(response.context_data['form'].errors)

        # previously logged in user should be logged out
        self.assertEquals(response.context['user'], AnonymousUser())
        user = auth.get_user(self.client)
        self.assertFalse(user.is_authenticated)

        # successful pass setup
        response = self.client.post(confirmation_link, valid_password_data)
        # redirect to success url was performed
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)

        # no new users created (just in case)
        self.assertEqual(get_user_model().objects.count(),
                         self.initial_users_count + 1)

        new_user = get_user_model().objects.get(email=new_user_email)

        # user is active
        self.assertTrue(new_user.is_active)

        # new agent gets logged in after successful form submission
        user = auth.get_user(self.client)
        self.assertTrue(user.is_authenticated)
        self.assertEqual(user, new_user)

        # new user can now sign in successfully using provided password

        self.client.logout()
        self.assertFalse(auth.get_user(self.client).is_authenticated)

        login_result = self.client.login(
            username=new_user_email, password=valid_password_data['password1'])
        self.assertTrue(login_result)

        self.assertEquals(self.client.request().context['user'], new_user)
