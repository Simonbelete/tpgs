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

        FirebaseMessaging().send_message(token="ceWL0nrTQ8eBuq5llju_Sk:APA91bGAdKfNOdgXSGj5baCFSM6bzUIq9rG7A1IY1JgNMaCQ61P7-oFywezDw4xvJ4WqrsPgrl7GvhRGY5X9wAJO-dVBCrplqDh3rY8vowo7atz-SznQNd6-uyzUqZWfZ1LPbLXz9L9l", title="Title", body="body")

        return user