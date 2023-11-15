
from model_bakery import baker
from django.urls import reverse
from rest_framework import status

from core.tests import CoreAPITests
from .models import NutrientGroup, Nutrient


class NutrientGroupAPITest(CoreAPITests):
    def make_recipe(self):
        return baker.make_recipe('nutrients.nutrient_group')

    def prepare_recipe(self):
        return baker.prepare_recipe('nutrients.nutrient_group')

    def setUp(self):
        self.model = self.make_recipe()
        return super().setUp()

    def test_get_nutrient_groups(self):
        url = reverse('api_nutrient_group-list')
        response = self.client.get(
            url, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json()['count'], NutrientGroup.all.all().count())

    def test_get_nutrient_groups_filters(self):
        filter_by = {'name': self.model.name,
                     'is_active': self.model.is_active}
        url = reverse('api_nutrient_group-list')
        response = self.client.get(
            url, filter_by, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(
            response.json()['count'], NutrientGroup.all.filter(**filter_by).count())

    def test_create_nutrient_group(self):
        url = reverse('api_nutrient_group-list')
        data = {
            'name': self.model.name,
            'is_active': self.model.is_active
        }
        response = self.client.post(
            url, data, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        for key, value in data.items():
            self.assertEqual(response.json()[key], value)

    def test_get_nutrient_by_id(self):
        model = self.make_recipe()
        data = {
            'id': model.id,
            'display_name': model.display_name,
            'name': model.name,
            'is_active': model.is_active,
        }
        url = reverse('api_nutrient_group-detail', args=[model.id])
        response = self.client.get(
            url, format="json", headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)

    def test_update_nutrient_group(self):
        model = self.make_recipe()
        update_model = self.prepare_recipe()
        url = reverse('api_nutrient_group-detail', args=[model.id])
        data = {
            'id': model.id,
            'name': update_model.name,
            'is_active': update_model.is_active
        }
        response = self.client.patch(
            url, data, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)

    def test_delete_nutrient_group(self):
        for user_type in self.USER_TYPE_HEADERS:
            model = self.make_recipe()
            url = reverse('api_nutrient_group-detail', args=[model.id])
            response = self.client.delete(
                url, format='json', headers=user_type['header'])

            self.assertEqual(response.status_code,
                             user_type['delete_status'], msg=user_type['msg'])

    def test_nutrient_summary(self):
        model = self.make_recipe()
        data = {
            'id': model.id,
            'display_name': model.display_name,
            'name': model.name,
            'is_active': model.is_active,
        }
        url = reverse('api_nutrient_group_summary-list', args=[model.id])
        response = self.client.get(
            url, format="json", headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_nutrient_group_history(self):
        model = self.make_recipe()
        data = {
            'id': model.id,
            'display_name': model.display_name,
            'name': model.name,
            'is_active': model.is_active,
        }
        url = reverse('api_nutrient_group_summary-list', args=[model.id])
        response = self.client.get(
            url, format="json", headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class NutrientAPITests(CoreAPITests):
    def make_recipe(self):
        return baker.make_recipe('nutrients.nutrient')

    def prepare_recipe(self):
        return baker.prepare_recipe('nutrients.nutrient')

    def setUp(self):
        self.model = self.make_recipe()
        return super().setUp()

    def test_get_nutrient(self):
        url = reverse('api_nutrient-list')
        response = self.client.get(
            url, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json()['count'], Nutrient.all.all().count())

    def test_get_nutrients_filters(self):
        filter_by = {'name': self.model.name,
                     'unit': self.model.unit.id,
                     'is_active': self.model.is_active}
        url = reverse('api_nutrient-list')
        response = self.client.get(
            url, filter_by, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(
            response.json()['count'], Nutrient.all.filter(**filter_by).count())

    # def test_create_nutrient(self):
    #     url = reverse('api_nutrient-list')
    #     model = self.make_recipe()
    #     data = {
    #         'name': model.name,
    #         'abbreviation': model.abbreviation,
    #         'unit': model.unit.id,
    #         'is_active': model.is_active
    #     }
    #     response = self.client.post(
    #         url, data, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

    #     self.assertEqual(response.status_code,
    #                      status.HTTP_201_CREATED, msg=response.content)

    #     for key, value in data.items():
    #         self.assertEqual(response.json()[key], value)

    def test_get_nutrient_by_id(self):
        model = self.make_recipe()
        data = {
            'id': model.id,
            'display_name': model.display_name,
            'name': model.name,
            'unit': model.unit,
            'is_active': model.is_active,
        }
        url = reverse('api_nutrient-detail', args=[model.id])
        response = self.client.get(
            url, format="json", headers=self.GROUP_FARM_ADMIN_HEADER)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), data)

    # def test_update_house(self):
    #     model = self.make_recipe()
    #     update_model = self.prepare_recipe()
    #     url = reverse('api_nutrient-detail', args=[model.id])
    #     data = {
    #         'id': model.id,
    #         'name': update_model.name,
    #         'is_active': update_model.is_active
    #     }
    #     response = self.client.patch(
    #         url, data, format='json', headers=self.GROUP_FARM_ADMIN_HEADER)

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.json(), data)

    # def test_delete_house(self):
    #     for user_type in self.USER_TYPE_HEADERS:
    #         model = self.make_recipe()
    #         url = reverse('api_nutrient-detail', args=[model.id])
    #         response = self.client.delete(
    #             url, format='json', headers=user_type['header'])

    #         self.assertEqual(response.status_code,
    #                          user_type['delete_status'], msg=user_type['msg'])

    # def test_house_summary(self):
    #     model = self.make_recipe()
    #     data = {
    #         'id': model.id,
    #         'display_name': model.display_name,
    #         'name': model.name,
    #         'is_active': model.is_active,
    #     }
    #     url = reverse('api_nutrient_summary-list', args=[model.id])
    #     response = self.client.get(
    #         url, format="json", headers=self.GROUP_FARM_ADMIN_HEADER)

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_house_history(self):
    #     model = self.make_recipe()
    #     data = {
    #         'id': model.id,
    #         'display_name': model.display_name,
    #         'name': model.name,
    #         'is_active': model.is_active,
    #     }
    #     url = reverse('api_nutrient_history-list', args=[model.id])
    #     response = self.client.get(
    #         url, format="json", headers=self.GROUP_FARM_ADMIN_HEADER)

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
