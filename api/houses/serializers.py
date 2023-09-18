from rest_framework import serializers

from users.serializers import UserSerializer_GET
from . import models


class HouseSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.House
        fields = ['id', 'name']


class HouseHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_GET()

    class Meta:
        model = models.House.history.__dict__['model']
        fields = '__all__'
