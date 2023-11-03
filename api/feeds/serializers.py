from rest_framework import serializers

from . import models
from chickens.serializers import ChickenSerializer_SLUG
from hatchery.serializers import HatcherySerializer_SLUG


class FeedSerializer_GET(serializers.ModelSerializer):
    chicken = ChickenSerializer_SLUG()
    hatchery = HatcherySerializer_SLUG()

    class Meta:
        model = models.Feed
        fields = ['id', 'hatchery', 'chicken',
                  'pen', 'formula', 'week', 'weight']


class FeedSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Feed
        fields = ['chicken', 'pen',
                  'week', 'weight', 'hatchery', 'formula']


class FeedHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Feed.history.__dict__['model']
        fields = '__all__'
