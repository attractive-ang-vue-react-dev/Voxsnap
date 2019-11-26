from abc import ABCMeta
from collections import namedtuple

from rest_framework.test import APITestCase

from apps.users.models import User


class TestCaseWithUsers(APITestCase):
    __metaclass__ = ABCMeta

    def setUp(self):
        """
        Create a set of user objects and store them as current class/object attributes
        named 'user'+index (self.user1, self.user2 etc.)

        """
        super(TestCaseWithUsers, self).setUp()

        # Creating users
        self.password = 'password1'

        UserData = namedtuple('UserData', 'email first_name last_name')

        users_data = [
            UserData('u1@example.com', 'Some', 'User'),
            UserData('u2@example.com', 'Some', 'Admin'),
            UserData('u3@example.com', 'Another', 'User'),
            UserData('u4@example.com', 'Another', 'Admin'),
        ]

        for idx, user_data in enumerate(users_data, start=1):
            attr_name = 'user{}'.format(idx)

            self.__setattr__(
                attr_name,
                User.objects.create_user(first_name=user_data.first_name,
                                         last_name=user_data.last_name,
                                         email=user_data.email,
                                         password=self.password))

    def login_user(self, user=None):
        if user:
            email = user.email
        else:
            email = self.user1.email

        login_result = self.client.login(username=email,
                                         password=self.password)

        if not login_result:
            raise Exception('User login failed')
