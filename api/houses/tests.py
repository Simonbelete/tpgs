
from model_bakery import baker
from django.urls import reverse
from rest_framework import status

from core.tests import CoreAPITests
from .models import House


class HouseAPITests(CoreAPITests):
    def make_recipe(self):
        return baker.make_recipe('houses.house')

    def prepare_recipe(self):
        return baker.prepare_recipe('houses.house')

    def setUp(self):
        self.model = self.prepare_recipe()
        return super().setUp()

    def test_get_houses(self):
        url = reverse('api_house-list')
        response = self.client.get(
            url, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json()['count'], House.all.all().count())

    def test_get_houses_filters(self):
        filter_by = {'name': self.model.name,
                     'is_active': self.model.is_active}
        url = reverse('api_house-list')
        response = self.client.get(
            url, filter_by, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(
            response.json()['count'], House.all.filter(**filter_by).count())

    def test_create_house(self):
        url = reverse('api_house-list')
        data = {
            'name': self.model.name,
            'is_active': self.model.is_active
        }
        response = self.client.post(
            url, data, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        for key, value in data.items():
            self.assertEqual(response.json()[key], value)

    def test_get_house_by_id(self):
        model = self.make_recipe()
        data = {
            'id': model.id,
            'display_name': model.display_name,
            'name': model.name,
            'is_active': model.is_active,
        }
        url = reverse('api_house-detail', args=[model.id])
        response = self.client.get(
            url, format="json", headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)

    def test_update_house(self):
        model = self.make_recipe()
        update_model = self.prepare_recipe()
        url = reverse('api_house-detail', args=[model.id])
        data = {
            'id': model.id,
            'name': update_model.name,
            'is_active': update_model.is_active
        }
        response = self.client.patch(
            url, data, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)

    def test_delete_house(self):
        for user_type in self.USER_TYPE_HEADERS:
            model = self.make_recipe()
            url = reverse('api_house-detail', args=[model.id])
            response = self.client.delete(
                url, format='json', headers=user_type['header'])

            self.assertEqual(response.status_code,
                             user_type['delete_status'], msg=user_type['msg'])
