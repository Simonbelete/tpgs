from rest_framework import serializers
from django.contrib.auth.models import Group, Permission

from . import models


class PermissionSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class GroupSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']


class UserSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'
