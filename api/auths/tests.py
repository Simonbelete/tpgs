
from model_bakery import baker
from django.urls import reverse
from rest_framework import status

from core.tests import CoreAPITests


class AuthAPITests(CoreAPITests):
    def test_change_self_password(self):
        url = reverse('api_change_password-list')
        model, headers = self.create_new_user()
        data = {
            'old_password': "DvCGR56LF9vYFHC",
            'new_password': 'y4M4NjkBAPfgXbt',
            'confirm_password': 'y4M4NjkBAPfgXbt'
        }
        response = self.client.post(url, data, format="json", headers=headers)

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK, msg=response.content)

    def test_change_self_password_validation(self):
        url = reverse('api_change_password-list')
        model, headers = self.create_new_user()
        data = {
            'old_password': "DvCGR56LF9vYFHC",
            'new_password': '1',
            'confirm_password': 'y4M4NjkBAPfgXbt'
        }
        response = self.client.post(url, data, format="json", headers=headers)

        self.assertEqual(response.status_code,
                         status.HTTP_400_BAD_REQUEST, msg=response.content)

    def test_deactivate_self_account(self):
        url = reverse('api_deactivate_account-list')
        model, headers = self.create_new_user()
        response = self.client.post(url, {}, format="json", headers=headers)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
