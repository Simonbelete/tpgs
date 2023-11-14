
import json
from model_bakery import baker
from django.urls import reverse
from rest_framework import status

from core.tests import CoreAPITests
from .models import House


class HouseAPITests(CoreAPITests):
    def setUp(self):
        self.house = baker.prepare_recipe('houses.house')
        return super().setUp()

    def test_get_houses(self):
        url = reverse('api_house-list')
        response = self.client.get(
            url, format='json', headers=self.farm_admin_headers)

        self.assertEqual(
            json.loads(response.content)['count'], House.objects.all().count())

    def test_create_house(self):
        url = reverse('api_house-list')
        data = {
            'name': self.house.name,
            'is_active': self.house.is_active
        }
        response = self.client.post(
            url, data, format='json', headers=self.farm_admin_headers)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(data['name'], json.loads(response.content)['name'])
        self.assertEqual(data['is_active'], json.loads(
            response.content)['is_active'])
