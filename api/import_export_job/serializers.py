from rest_framework import serializers

from . import models


class ImportJobSerializer_GET(serializers.ModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = models.ImportJob
        fields = '__all__'


class ImportJobSerializer_POST(serializers.ModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = models.ImportJob
        fields = ['id', 'file', 'format', 'resource']
