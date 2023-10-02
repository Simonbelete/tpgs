from rest_framework import serializers

from . import models
from chickens.serializers import ChickenSerializer_SLUG
from flocks.serializers import FlockSerializer_SLUG

class WeightSerializer_GET(serializers.ModelSerializer):
    chicken = ChickenSerializer_SLUG()
    flock = FlockSerializer_SLUG()
    class Meta:
        model = models.Weight
        fields = '__all__'


class WeightSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Weight
        fields = ['chicken', 'flock', 'week', 'weight']


class WeightHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Weight.history.__dict__['model']
        fields = '__all__'
