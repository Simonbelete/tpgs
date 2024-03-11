from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from . import models
from . import serializers
from farms.models import Farm
from .tasks import _run_import, _run_export

from . import filters


class ImportJobViewSet(viewsets.ModelViewSet):
    queryset = models.ImportJob.objects.all()
    serializer_class = serializers.ImportJobSerializer_GET
    filterset_class = filters.ImportJobFilter
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.ImportJobSerializer_GET
        return serializers.ImportJobSerializer_POST

    def perform_create(self, serializer):
        farm = Farm.objects.get(name=self.request.tenant)
        serializer.save(created_by=self.request.user,
                        farm=farm)


class ExportJobViewSet(viewsets.ModelViewSet):
    queryset = models.ExportJob.objects.all()
    serializer_class = serializers.ExportJobSerializer_GET
    filterset_class = filters.ExportJobFilter
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.ExportJobSerializer_GET
        return serializers.ExportJobSerializer_POST

    def perform_create(self, serializer):
        farm = Farm.objects.get(name=self.request.tenant)
        serializer.save(created_by=self.request.user,
                        farm=farm)
