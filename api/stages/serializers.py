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
