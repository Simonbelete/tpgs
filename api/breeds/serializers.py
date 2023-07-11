from rest_framework import serializers

from . import models


class BreedSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = '__all__'


class BreedSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Breed
        fields = ['name', 'color']


class BreedHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Breed.history.__dict__['model']
        fields = '__all__'
