from rest_framework import serializers

from feeds.models import Feed, FeedType
from users.api.serializers import UserSerializer_GET_V1
from chickens.api.serializers import ChickenSerializer_GET_V1


class FeedTypeSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = FeedType
        fields = '__all__'


class FeedTypeHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    name = serializers.CharField()

    class Meta:
        model = FeedType.history.__dict__['model']
        fields = '__all__'


class FeedSerializer_GET_V1(serializers.ModelSerializer):
    chicken = ChickenSerializer_GET_V1()

    class Meta:
        model = Feed
        fields = '__all__'


class ChickenFeedSerialize(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = '__all__'


class FeedHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    chicken = ChickenSerializer_GET_V1()
    feed_type = FeedTypeSerializer_GET_V1()

    class Meta:
        model = Feed.history.__dict__['model']
        fields = '__all__'
