from rest_framework import serializers

from . import models
from chickens.serializers import ChickenSerializer_SLUG
from flocks.serializers import FlockSerializer_SLUG

class FeedSerializer_GET(serializers.ModelSerializer):
    chicken = ChickenSerializer_SLUG()
    flock = FlockSerializer_SLUG()

    class Meta:
        model = models.Feed
        fields = '__all__'


class FeedSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Feed
        fields = ['chicken', 'flock', 'week', 'weight', 'formula']


class FeedHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Feed.history.__dict__['model']
        fields = '__all__'
