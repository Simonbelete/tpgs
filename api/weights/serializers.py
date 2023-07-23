from rest_framework import serializers

from . import models


class WeightSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Weight
        fields = '__all__'


class WeightSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Weight
        fields = []


class WeightHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Weight.history.__dict__['model']
        fields = '__all__'
