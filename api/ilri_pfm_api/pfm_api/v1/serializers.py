from rest_framework import serializers
from rest_framework import exceptions

from pfm_api.models import User, Device

class UserSerializer(serializers.ModelSerializer):
    # name = serializers.CharField()
    devices =  serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='devices'
    )
    email = serializers.CharField()
    # is_admin = serializers.BooleanField()
    is_farmer = serializers.BooleanField()

    class Meta:
        model = User
        fields = ['name', 'email', 'is_admin', 'is_admin', 'is_staff', 'is_farmer', 'username', 'devices']

class DeviceSerializer(serializers.ModelSerializer):
    token = serializers.CharField()

    class Meta:
        model = Device
        fields = '__all__'