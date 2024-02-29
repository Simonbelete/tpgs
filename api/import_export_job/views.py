from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from . import models
from . import serializers
from farms.models import Farm
from .tasks import _run_import


class ImportJobViewSet(viewsets.ModelViewSet):
    queryset = models.ImportJob.objects.all()
    serializer_class = serializers.ImportJobSerializer_GET

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.ImportJobSerializer_GET
        return serializers.ImportJobSerializer_POST

    def perform_create(self, serializer):
        farm = Farm.objects.get(name=self.request.tenant)
        serializer.save(created_by=self.request.user,
                        farm=farm)
