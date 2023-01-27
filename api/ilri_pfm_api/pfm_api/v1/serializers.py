from rest_framework import serializers
from rest_framework import exceptions

from pfm_api.models import User, Device
from pfm_api.firebase_messageing import FirebaseMessaging

class DeviceSerializer(serializers.ModelSerializer):
    token = serializers.CharField()

    class Meta:
        model = Device
        fields = ['token', 'is_active']

class UserSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True)
    uid = serializers.CharField()
    email = serializers.CharField()
    is_farmer = serializers.BooleanField()

    class Meta:
        model = User
        fields = ['name', 'email', 'uid', 'is_admin', 'is_admin', 'is_staff', 'is_farmer', 'is_approved', 'devices']

    def create(self, validated_data):
        device_data = validated_data.pop('devices')
        user = User.objects.create(**validated_data)

        for device in device_data:
            Device.objects.create(user=user, **device)

        admin_user = User.objects.filter(is_admin=True)
        for a in admin_user:
            admin_devices = Device.objects.filter(user=a.id)
            for device in admin_devices:
                FirebaseMessaging().send_message(token=device.token, title="Title", body="body")

        return user

class FarmSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Device
        fields = ['name', 'is_active']