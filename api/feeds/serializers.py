from rest_framework import serializers

from . import models
from chickens.serializers import ChickenSerializer_SLUG
from hatchery.serializers import HatcherySerializer_SLUG
from pen.serializers import PenSerializer_SLUG


class FeedSerializer_GET(serializers.ModelSerializer):
    chicken = ChickenSerializer_SLUG()
    hatchery = HatcherySerializer_SLUG()
    pen = PenSerializer_SLUG()

    class Meta:
        model = models.Feed
        fields = ['id', 'hatchery', 'chicken', 'display_name',
                  'pen', 'formula', 'week', 'weight', 'total_chickens', 'children_feed_count', 'created_at', 'is_active']


class FeedSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Feed
        fields = ['id', 'chicken', 'pen',
                  'week', 'weight', 'hatchery', 'formula', 'is_active']


class FeedHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Feed.history.__dict__['model']
        fields = '__all__'
