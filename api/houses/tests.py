
from model_bakery import baker
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import House
from users.models import User


class HouseAPITests(APITestCase):
    def setUp(self):
        self.tenant = "test"
        self.headers.update({'x-Request-Id': self.tenant})
        self.house = baker.prepare_recipe('houses.house')

    def test_create_house(self):
        url = reverse('api_house-list')
        print('-------------')
        print(url)
        print(self.tenant)
        data = {
            'name': self.house.name
        }
        response = self.client.post(
            url, data, format='json', headers={'x-Request-Id': self.tenant})
        print(response.request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
