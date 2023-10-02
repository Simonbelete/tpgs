from rest_framework import serializers

from . import models
from chickens.serializers import ChickenSerializer_SLUG
from flocks.serializers import FlockSerializer_SLUG

class EggSerializer_GET(serializers.ModelSerializer):
    chicken = ChickenSerializer_SLUG()
    flock = FlockSerializer_SLUG()
    class Meta:
        model = models.Egg
        fields = '__all__'


class EggSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Egg
        fields = ['chicken', 'flock', 'week', 'eggs', 'weight']


class EggHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Egg.history.__dict__['model']
        fields = '__all__'
