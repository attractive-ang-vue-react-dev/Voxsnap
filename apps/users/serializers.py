from allauth.account.forms import ResetPasswordForm
from rest_auth.serializers import PasswordResetSerializer
from rest_framework import serializers

from .models import Customer, User, Notification


class CustomerSerializer(serializers.ModelSerializer):
    additional_services = serializers.ListField(write_only=True,
                                                required=False)

    class Meta:
        model = Customer
        fields = '__all__'


class CustomerNestedSerializer(CustomerSerializer):
    class Meta(CustomerSerializer.Meta):
        fields = ['id', 'podcasts', 'amazon_alexa', 'google_actions']
        #fields = ['id', 'itunes_podcasts', 'amazon_alexa', 'google_podcasts']


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name')


class CurrentUserSerializer(UserBasicSerializer):
    customer = CustomerNestedSerializer(read_only=True)

    class Meta(UserBasicSerializer.Meta):
        UserBasicSerializer.Meta.fields += ('customer', )


class UserExtendedSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(required=False)

    def update(self, instance, validated_data):
        if 'customer' in validated_data:
            customer_data = validated_data.pop('customer')
        else:
            customer_data = []

        customer = instance.customer
        # Customer.objects.filter(pk=customer.id).update(**customer_data)
        customer.company_name = customer_data.get('company_name',
                                                  customer.company_name)
        customer.twitter = customer_data.get('twitter', customer.twitter)
        customer.website = customer_data.get('website', customer.website)
        customer.brand_color = customer_data.get('brand_color',
                                                 customer.brand_color)
        customer.phone_number = customer_data.get('phone_number',
                                                  customer.phone_number)
        customer.save()

        return super().update(instance, validated_data)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'customer')


class AllAuthPasswordResetSerializer(PasswordResetSerializer):
    """
    Overrides default rest_auth serializer to use django_allauth form/logic
    just like in allauth.account.views.PasswordResetView
    """
    password_reset_form_class = ResetPasswordForm


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
