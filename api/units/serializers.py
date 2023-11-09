from rest_framework import serializers

from users.serializers import UserSerializer_SLUG
from . import models


class UnitSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Unit
        fields = ['id', 'name', 'display_name' 'is_active']


class UnitSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Unit
        fields = ['id', 'name', 'is_active']


class UnitHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_SLUG()

    class Meta:
        model = models.Unit.history.__dict__['model']
        fields = '__all__'


class UnitConverterSerializer_GET(serializers.ModelSerializer):
    unit_from = UnitSerializer_GET()
    unit_to = UnitSerializer_GET()

    class Meta:
        model = models.UnitConverter
        fields = '__all__'


class UnitConverterHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_SLUG()

    class Meta:
        model = models.UnitConverter.history.__dict__['model']
        fields = '__all__'
