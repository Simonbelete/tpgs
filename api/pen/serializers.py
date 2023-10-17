from rest_framework import serializers

from users.serializers import UserSerializer_SLUG
from houses.serializers import HouseSerializer_SLUG 
from . import models

class PenSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Pen
        fields = ['id', 'name']

class PenSerializer_GET(serializers.ModelSerializer):
    house = HouseSerializer_SLUG()
    class Meta:
        model = models.Pen
        fields = ['id', 'name', 'house', 'display_name', 'is_active']

class PenSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Pen
        fields = ['name', 'house', 'is_active']

class PenHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_SLUG()

    class Meta:
        model = models.Pen.history.__dict__['model']
        fields = '__all__'
