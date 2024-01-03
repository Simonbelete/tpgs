from rest_framework import serializers

from . import models
from chickens.serializers import ChickenSerializer_SLUG


class EggSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Egg
        fields = ['id', 'display_name']


class EggSerializer_GET(serializers.ModelSerializer):
    chicken = ChickenSerializer_SLUG()

    class Meta:
        model = models.Egg
        fields = ['id', 'display_name', 'chicken', 'weight',
                  'week', 'eggs', 'available_eggs', 'hatchery_eggs', 'display_available_eggs', 'is_active', 'created_at']


class EggSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Egg
        fields = ['id', 'chicken', 'week', 'eggs', 'weight', 'is_active']


class EggHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Egg.history.__dict__['model']
        fields = '__all__'
