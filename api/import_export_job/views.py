from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse
from rest_framework import viewsets, renderers
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

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
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.ImportJobSerializer_GET_BY_ID(instance)
        return Response(serializer.data)
    
    def list(self, request, *args, **kwargs):
        if(request.user.is_superuser):
            return super().list(request, *args, **kwargs)
        
        queryset = models.ImportJob.objects.all().filter(farm__name=request.tenant, created_by=request.user)
        queryset = self.filter_queryset(queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        


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
        serializer.save(created_by=self.request.user,
                            farm=farm, filter_dict=self.request.GET.dict())
    
    def list(self, request, *args, **kwargs):
        if(request.user.is_superuser):
            return super().list(request, *args, **kwargs)
        
        queryset = models.ExportJob.objects.all().filter(farm__name=request.tenant, created_by=request.user)            

        queryset = self.filter_queryset(queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, renderer_classes=(PassthroughRenderer,), permission_classes = [AllowAny])
    def download(self, *args, **kwargs):
        instance = self.get_object()

        # get an open file handle (I'm just using a file attached to the model for this example):
        file_handle = instance.file.open()

        # send file
        response = FileResponse(file_handle, content_type='xlsx')
        response['Content-Length'] = instance.file.size
        response['Content-Disposition'] = 'attachment; filename="%s"' % instance.file.name

        return response
