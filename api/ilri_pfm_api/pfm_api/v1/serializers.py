from rest_framework import serializers
from rest_framework import exceptions

from pfm_api.models import User, Device

class DeviceSerializer(serializers.ModelSerializer):
    token = serializers.CharField()

    class Meta:
        model = Device
        fields = ['token', 'is_active']

class UserSerializer(serializers.ModelSerializer):
    # name = serializers.CharField()
    # devices =  serializers.SlugRelatedField(
    #     many=True,
    #     slug_field='devices'
    # )
    devices = DeviceSerializer(many=True)
    email = serializers.CharField()
    # is_admin = serializers.BooleanField()
    is_farmer = serializers.BooleanField()

    class Meta:
        model = User
        fields = ['name', 'email', 'is_admin', 'is_admin', 'is_staff', 'is_farmer', 'devices']

    def create(self, validated_data):
        device_data = validated_data.pop('devices')
        user = User.objects.create(**validated_data)

        for device in device_data:
            Device.objects.create(user=user, **device)

        return user