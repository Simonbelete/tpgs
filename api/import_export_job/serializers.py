from rest_framework import serializers

from . import models


class ImportJobSerializer_GET(serializers.ModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = models.ImportJob
        fields = ['id', 'file', 'farm', 'processing_initiated', 'format', 'resource', 'job_status', 'uploaded_on', 'created_by']


class ImportJobSerializer_GET_BY_ID(serializers.ModelSerializer):
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
        fields = ['id', 'file', 'farm', 'processing_initiated',
                  'resource', 'format', 'job_status', 'errors',
                  'process_finished', 'created_by', 'file_exists']


class ExportJobSerializer_POST(serializers.ModelSerializer):

    class Meta:
        model = models.ExportJob
        fields = ['id', '  source', 'format',
                  'email_on_completion']
