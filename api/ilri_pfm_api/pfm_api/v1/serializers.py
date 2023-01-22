from rest_framework import serializers
from rest_framework import exceptions

from pfm_api.models import User

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    email = serializers.CharField()
    is_admin = serializers.BooleanField()
    is_farmer = serializers.BooleanField()

    class Meta:
        model = User
        fields = ['name', 'email', 'is_admin', 'is_admin', 'is_staff', 'is_farmer', 'username']