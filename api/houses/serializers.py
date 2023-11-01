from rest_framework import serializers

from users.serializers import UserSerializer_SLUG
from . import models

class HouseSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.House
        fields = ['id', 'name']

class HouseSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.House
        fields = ['id', 'name', 'display_name', 'is_active']


class HouseHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_SLUG()

    class Meta:
        model = models.House.history.__dict__['model']
        fields = '__all__'
