from rest_framework import serializers

from . import models


class EggSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Egg
        fields = '__all__'


class EggSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Egg
        fields = ['chicken']


class EggHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Egg.history.__dict__['model']
        fields = '__all__'
