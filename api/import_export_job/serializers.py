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


class ExportJobSerializer_GET(serializers.ModelSerializer):

    class Meta:
        model = models.ExportJob
        fields = '__all__'


class ExportJobSerializer_POST(serializers.ModelSerializer):

    class Meta:
        model = models.ExportJob
        fields = ['id', 'resource', 'format',
                  'email_on_completion']
