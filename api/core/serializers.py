from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['name'] = self.user.name
        data['email'] = self.user.email
        # data['farms'] = self.user.farms
        data['groups'] = self.user.groups.values_list('name', flat=True)

        return data


class UploadSerializer(serializers.Serializer):
    file = serializers.FileField()
