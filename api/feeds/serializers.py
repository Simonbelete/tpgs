from rest_framework import serializers

from . import models


class FeedSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Feed
        fields = '__all__'


class FeedSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Feed
        fields = ['weight']


class FeedHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Feed.history.__dict__['model']
        fields = '__all__'
