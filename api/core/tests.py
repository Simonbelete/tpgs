
from model_bakery import baker
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class CoreAPITests(APITestCase):
    def setUp(self):
        self.tenant = "test"

        # Farm Admin
        self.farm_admin = baker.make_recipe('users.farm_admin')
        refresh = RefreshToken.for_user(self.farm_admin)

        self.farm_admin_token = str(refresh.access_token)

        self.farm_admin_headers = {'x-Request-Id': self.tenant,
                                   'Authorization': "{type} {token}".format(type="Bearer", token=self.farm_admin_token)}
