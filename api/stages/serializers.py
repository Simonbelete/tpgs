from rest_framework import serializers

from . import models


class StageSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Stage
        fields = '__all__'


class StageSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Stage
        fields = '__all__'


class StageHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stage.history.__dict__['model']
        fields = '__all__'
