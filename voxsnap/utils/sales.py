from django.conf import settings
import stripe

from apps.sales.models import PromoCode
from voxsnap.utils.constants import (ADDITIONAL_WORDS_PRICES, PACKAGE_PRICES,
                                     AdditionalServices, PackageTypes)
from voxsnap.utils.narrations import calculate_article_word_count

stripe.api_key = settings.STRIPE_SECRET_KEY


class OrderCreationException(Exception):
    pass


def get_unit_price(quantity, package_type):
    assert quantity > 0, "Quantity must be 1 or more narrations"

    package_prices_ordered_keys = sorted(PACKAGE_PRICES[package_type].keys(),
                                         reverse=True)
    unit_price = PACKAGE_PRICES[package_type][package_prices_ordered_keys[-1]]

    for items_num in package_prices_ordered_keys:
        if quantity >= items_num:
            unit_price = PACKAGE_PRICES[package_type][items_num]
            break

    return unit_price


def calculate_order_total(quantity,
                          package_type,
                          promo_code_obj=None,
                          additional_services=None):
    # todo unit test
    assert quantity > 0, "Quantity must be 1 or more narrations"
    assert additional_services is None or type(additional_services) == list

    unit_price = get_unit_price(quantity, package_type)

    base_amount = unit_price * quantity
    additional_services_total = 0

    additional_services_data = []
    if additional_services:
        for service_identifier in additional_services:
            if service_identifier in AdditionalServices.SERVICES_ENABLED:
                service_price = AdditionalServices.PRICES.get(
                    service_identifier)
                additional_services_total += service_price
                additional_services_data.append({
                    'title':
                    AdditionalServices.DESCRIPTIONS.get(service_identifier),
                    'price':
                    service_price,
                })

    if promo_code_obj:
        base_amount, discount = promo_code_obj.calculate_discount(base_amount)
        additional_services_total, discount = promo_code_obj.calculate_discount(
            additional_services_total)

    return base_amount, unit_price, additional_services_total, additional_services_data


def calculate_additional_amount(quantity,
                                narrations_list,
                                package_type,
                                promo_code_obj=None):
    """calculate the number of words for narrations and additional order price"""

    assert package_type in [PackageTypes.MONTHLY, PackageTypes.ONE_TIME]
    assert quantity > 0

    package_prices_ordered_keys = sorted(PACKAGE_PRICES[package_type].keys(),
                                         reverse=True)
    additional_word_price = 0

    for items_num in package_prices_ordered_keys:
        if quantity >= items_num:
            additional_word_price = ADDITIONAL_WORDS_PRICES[package_type][
                items_num]
            break

    assert additional_word_price > 0, 'There was a problem with finding the ' \
                                      'correct package to determine additional words cost'

    narrations_extra_data = []
    extra_sum = 0
    for narration_data in narrations_list:
        word_count = calculate_article_word_count(narration_data.get('url'))
        narration_extra_data = {
            'url': narration_data.get('url'),
            'word_count': word_count
        }
        if word_count > 800:
            extra_words_count = word_count - 800
            extra_sum += extra_words_count * additional_word_price
            narration_extra_data['extra_sum'] = extra_sum

        narrations_extra_data.append(narration_extra_data)

    if promo_code_obj:
        extra_sum, discount = promo_code_obj.calculate_discount(extra_sum)

    return round(extra_sum, 2), narrations_extra_data


def create_stripe_customer(customer_email, stripe_token):
    customer = stripe.Customer.create(email=customer_email, card=stripe_token)
    return customer


# todo exceptions processing in a separate common function for all the stripe-related calls
def create_stripe_charge(customer_id, amount_to_charge, charge_descr, charge_meta_data):
    try:
        # Attempt to charge customer
        charge_data = stripe.Charge.create(customer=customer_id,
                                           amount=int(amount_to_charge * 100),
                                           currency='usd',
                                           description=charge_descr,
                                           metadata=charge_meta_data)
        # app.logger.info(charge)

        return charge_data
    # todo logger(): str(e); e.json_body for all the errors
    except stripe.error.CardError as e:
        # Since it's a decline, stripe.error.CardError will be caught
        body = e.json_body
        err = body['error']

        # app.logger.info("Status is: %s" % e.http_status)
        # app.logger.info("Type is: %s" % err['type'])
        # app.logger.info("Code is: %s" % err['code'])
        # # param is '' in this case
        # app.logger.info("Param is: %s" % err['param'])
        # app.logger.info("Message is: %s" % err['message'])

        return OrderCreationException(err)
    except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
        raise OrderCreationException("Stripe API is being throttled")
    except stripe.error.InvalidRequestError as e:
        # Invalid parameters were supplied to Stripe's API
        raise OrderCreationException(
            "Invalid parameters were supplied to the Stripe API")
    except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
        raise OrderCreationException(
            "Authentication with the Stripe API failed")
    except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
        raise OrderCreationException(
            "Network communication with Stripe failed")
    except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe send
        # yourself an email
        raise OrderCreationException("Stripe API has an error")
    except Exception as e:
        # Something else happened, completely unrelated to Stripe
        raise OrderCreationException("Please open a support ticket")


def create_stripe_subscription(user_obj, amount, plan_id=settings.STRIPE_MONTHLY_SUBSCRIPTION_ID, metadata=None):
    subscription = stripe.Subscription.create(
        customer=user_obj.stripe_data.stripe_id,
        items=[{
            'plan': plan_id,
            'quantity': int(amount)
        }],
        metadata=metadata)
    return subscription


def create_subscription_invoice(amount,
                                customer_id,
                                subscription_id,
                                description,
                                metadata=None):
    # https://stripe.com/docs/subscriptions/invoices#generating-invoices
    stripe.InvoiceItem.create(amount=int(amount * 100),
                              currency='usd',
                              customer=customer_id,
                              subscription=subscription_id,
                              description=description,
                              metadata=metadata)


def validate_promo_code(promo_code):
    promo_code_obj = None
    result = False

    try:
        promo_code_obj = PromoCode.objects.get(code=promo_code)

        if promo_code_obj.is_valid:
            result = True
        # else:
        #     promo_code_obj = None
    except PromoCode.DoesNotExist:
        pass

    return result, promo_code_obj
