from rest_framework import serializers

from . import models


class ImportJobSerializer_GET(serializers.ModelSerializer):
    file = serializers.FileField()

    class Meta:
        model = models.ImportJob
        fields = '__all__'


class ImportJobSerializer_POST(serializers.ModelSerializer):
    file = serializers.FileField()

    def perform_create(self, serializer):
        print('0000000000000000000000000000')
        print(self.request.tenant_model)
        serializer.save(created_by=self.request.user,
                        farm=self.request.tenant_model.id)

    class Meta:
        model = models.ImportJob
        fields = ['file', 'format', 'resource']
