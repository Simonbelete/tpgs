from rest_framework import serializers

from . import models


class PurposeSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Purpose
        fields = '__all__'


class PurposeSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Purpose
        fields = ['id', 'name']


class PurposeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Purpose.history.__dict__['model']
        fields = '__all__'
