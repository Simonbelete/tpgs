from rest_framework import serializers

from . import models


class FlockSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Flock
        fields = '__all__'
