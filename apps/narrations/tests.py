from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class NarrationsTestCase(APITestCase):
    def setUp(self):
        self.word_count_url = reverse('api:word_count')

    def test_word_count_api_view(self):
        """Word count for specific url is returned in agreed format"""
        url = 'https://docs.djangoproject.com/'

        response = self.client.post(self.word_count_url, {'url': url},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.keys()), 1)
        self.assertEqual(list(response.data)[0], 'wordcount')
        self.assertEqual(type(response.data['wordcount']), int)

    def test_word_count_api_view_error(self):
        """
        Error message is returned for the pages that have
        main content of no longer then 200 symbols
        """
        url = 'https://google.com/'  # Google will barely have to much content at the home page

        response = self.client.post(self.word_count_url, {'url': url},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(response.data.keys()), 1)
        self.assertEqual(list(response.data)[0], 'error')
        self.assertEqual(type(response.data['error']), str)
        self.assertGreater(len(response.data['error']), 0)
