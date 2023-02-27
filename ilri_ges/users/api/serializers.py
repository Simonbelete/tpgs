from rest_framework import serializers
from django.contrib.auth.models import Group

from users.models import User


class GroupSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class UserSerializer_GET_V1(serializers.ModelSerializer):
    groups = GroupSerializer_GET_V1(many=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'groups', 'is_active']
