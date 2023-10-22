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
    farms = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = models.User
        fields = ['id', 'name', 'username', 'email', 'farms', 'groups',
                  'first_name', 'last_name', 'last_login']

class UserSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['name']

class UserSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'name', 'username']