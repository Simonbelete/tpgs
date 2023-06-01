from rest_framework import serializers
from . import models


class UnitSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Unit
        fields = '__all__'


class UnitConverterSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.UnitConverter
        fields = '__all__'
