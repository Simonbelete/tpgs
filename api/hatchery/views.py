from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import NotFound

from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    XlsxExport,
    XlsExport,
    CsvExport,
    XlsxImport,
    XlsImport,
    CsvImport
)
from core.pagination import AllPagination
from . import models
from . import serializers
from . import admin
from . import filters

## Hatchery
class HatcheryViewSet(viewsets.ModelViewSet):
    queryset = models.Hatchery.objects.all()
    serializer_class = serializers.HatcherySerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.HatcherySerializer_POST
        return serializers.HatcherySerializer_GET

## Hatchery Export & Export
class HatcheryXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.HatcheryResource().export()

class HatcheryXlsExport(XlsExport):
    def get_dataset(self):
        return admin.HatcheryResource().export()

class HatcheryCsvExport(CsvExport):
    def get_dataset(self):
        return admin.HatcheryResource().export()

class HatcheryXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.HatcheryResource
    
class HatcheryXlsImport(XlsImport):
    def get_resource(self):
        return admin.HatcheryResource
        
class HatcheryCsvImport(CsvImport):
    def get_resource(self):
        return admin.HatcheryResource


## Eggs Of Hatchery
class HatcherysEggViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.HatcheryEggSerializer_GET

    def get_queryset(self):
        try:
            return models.HatcheryEgg.all.filter(hatchery=self.kwargs['hatchery_pk'])
        except models.HatcheryEgg.DoesNotExist as ex:
            raise NotFound()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.HatcheryEggSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.HatcheryEggSerializer_PATCH
        return serializers.HatcheryEggSerializer_GET
    
## Hatchery Eggs 
class HatcheryEggViewSet(CoreModelViewSet):
    queryset = models.HatcheryEgg.all.all()
    serializer_class = serializers.HatcheryEggSerializer_GET

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.HatcheryEggSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.HatcheryEggSerializer_PATCH
        return serializers.HatcheryEggSerializer_GET

## Hatchery Export & Export
class HatcheryEggsXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.HatcheryEggsResource().export()

class HatcheryEggsXlsExport(XlsExport):
    def get_dataset(self):
        return admin.HatcheryEggsResource().export()

class HatcheryEggsCsvExport(CsvExport):
    def get_dataset(self):
        return admin.HatcheryEggsResource().export()

class HatcheryEggsXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.HatcheryEggsResource
    
class HatcheryEggsXlsImport(XlsImport):
    def get_resource(self):
        return admin.HatcheryEggsResource
        
class HatcheryEggsCsvImport(CsvImport):
    def get_resource(self):
        return admin.HatcheryEggsResource
    
    
## Incubations
class IncubationViewSet(CoreModelViewSet):
    queryset = models.Incubation.all.all()
    serializer_class = serializers.IncubationSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.IncubationSerializer_POST
        return serializers.IncubationSerializer_GET
    
## Incubation Export & Export
class IncubationXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.IncubationResource().export()

class IncubationXlsExport(XlsExport):
    def get_dataset(self):
        return admin.IncubationResource().export()

class IncubationCsvExport(CsvExport):
    def get_dataset(self):
        return admin.IncubationResource().export()

class IncubationXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.IncubationResource
    
class IncubationXlsImport(XlsImport):
    def get_resource(self):
        return admin.IncubationResource
        
class IncubationCsvImport(CsvImport):
    def get_resource(self):
        return admin.IncubationResource
    
## Hatchery -> Incubation
class HatcheryIncubationViewSet(CoreModelViewSet):
    pagination_class = AllPagination
    serializer_class = serializers.HatcheryIncubationSerializer_GET
    filterset_class = filters.IncubationFilter
    ordering_fields = '__all__'

    def get_queryset(self):
        try:
            return models.Incubation.all.filter(requirement=self.kwargs['hatchery_pk'])
        except models.Incubation.DoesNotExist as ex:
            raise NotFound()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.HatcheryIncubationSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.HatcheryIncubationSerializer_PATCH
        return serializers.HatcheryIncubationSerializer_GET