from rest_framework import serializers

from . import models


class FlockSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Flock
        fields = '__all__'


class FlockSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Flock
        fields = ['name']


class FlockHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Flock.history.__dict__['model']
        fields = '__all__'
