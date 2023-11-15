
from model_bakery import baker
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

from users.models import User


class CoreAPITests(APITestCase):
    def setUp(self):
        self.TENANT = "test"

        # Superuser
        self.GROUP_SUPERUSER = baker.make_recipe('users.superuser')
        refresh = RefreshToken.for_user(self.GROUP_SUPERUSER)

        self.GROUP_SUPERUSER_TOKEN = str(refresh.access_token)

        self.GROUP_SUPERUSER_HEADER = {'x-Request-Id': self.TENANT,
                                       'Authorization': "{type} {token}".format(type="Bearer", token=self.GROUP_SUPERUSER_TOKEN)}

        # Farm admin
        self.GROUP_FARM_ADMIN = baker.make_recipe('users.farm_admin')
        refresh = RefreshToken.for_user(self.GROUP_FARM_ADMIN)

        self.GROUP_FARM_ADMIN_TOKEN = str(refresh.access_token)

        self.GROUP_FARM_ADMIN_HEADER = {'x-Request-Id': self.TENANT,
                                        'Authorization': "{type} {token}".format(type="Bearer", token=self.GROUP_FARM_ADMIN_TOKEN)}

        # Farmer
        self.GROUP_FARMER = baker.make_recipe('users.farmer')
        refresh = RefreshToken.for_user(self.GROUP_FARMER)

        self.GROUP_FARMER_TOKEN = str(refresh.access_token)

        self.GROUP_FARMER_HEADER = {'x-Request-Id': self.TENANT,
                                    'Authorization': "{type} {token}".format(type="Bearer", token=self.GROUP_FARMER_TOKEN)}

        self.USER_TYPE_HEADERS = [
            {
                'msg': 'Testing For Superadmin',
                'header': self.GROUP_SUPERUSER_HEADER,
                'delete_status': status.HTTP_204_NO_CONTENT
            },
            {
                'msg': 'Testing For Farm admin',
                'header': self.GROUP_FARM_ADMIN_HEADER,
                'delete_status': status.HTTP_204_NO_CONTENT
            },
            {
                'msg': 'Testing For farmer',
                'header': self.GROUP_FARMER_HEADER,
                'delete_status': status.HTTP_403_FORBIDDEN
            }
        ]

    def create_new_user(self):
        # user = baker.make_recipe('users.user')
        u = baker.prepare_recipe('users.user')
        user = User.objects.create_user(
            name=u.name, email=u.email, password="DvCGR56LF9vYFHC")
        refresh = RefreshToken.for_user(user)

        return user, {'x-Request-Id': self.TENANT,
                      'Authorization': "{type} {token}".format(type="Bearer", token=str(refresh.access_token))}
