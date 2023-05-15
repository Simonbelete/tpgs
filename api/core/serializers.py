from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from users.serializers import GroupSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['name'] = self.user.name
        data['email'] = self.user.email
        data['farm'] = self.user.farm
        data['groups'] = self.user.groups.values_list('name', flat=True)

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print('-------------')
        print(user.groups)
        print(user.groups.all())
        print(token)
        # Add custom claims
        token['name'] = user.name
        token['email'] = user.email
        token['farm'] = user.farm
        # token['groups'] = user.groups.values_list('name', flat=True)
        # ...

        return token
