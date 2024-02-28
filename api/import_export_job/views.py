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

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     import_job = serializer.data
    #     headers = self.get_success_headers(serializer.data)

    #     import_job = models.ImportJob.objects.get(pk=import_job.get('id'))
    #     _run_import(import_job, dry_run=True)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
