from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse
from rest_framework import viewsets, renderers
from rest_framework.decorators import action

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
        # _run_import(x, dry_run=False)
        


class PassthroughRenderer(renderers.BaseRenderer):
    """
        Return data as-is. View should supply a Response.
    """
    media_type = ''
    format = ''

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data


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
        x = serializer.save(created_by=self.request.user,
                            farm=farm, filter_dict=self.request.GET.dict())
        # print('000000000000000')
        # _run_export(x)

    @action(methods=['get'], detail=True, renderer_classes=(PassthroughRenderer,))
    def download(self, *args, **kwargs):
        instance = self.get_object()

        # get an open file handle (I'm just using a file attached to the model for this example):
        file_handle = instance.file.open()

        # send file
        response = FileResponse(file_handle, content_type='whatever')
        response['Content-Length'] = instance.file.size
        response['Content-Disposition'] = 'attachment; filename="%s"' % instance.file.name

        return response
