from rest_framework import serializers
from django.contrib.auth.models import Group, Permission

from . import models
from farms.serializers import FarmSerializer_SLUG


class PermissionSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class GroupSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class UserSerializer_GET(serializers.ModelSerializer):
    # farms = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='name'
    # )
    farms = FarmSerializer_SLUG(many=True)
    groups = GroupSerializer_GET(many=True)
    # groups = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='name'
    # )

    class Meta:
        model = models.User
        fields = ['id', 'name', 'username', 'email', 'farms', 'groups', 'is_active',
                  'first_name', 'last_name', 'last_login']


class UserSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['name', 'farms', 'groups', 'is_active']


class UserSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'name', 'username']
