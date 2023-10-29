from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from datetime import date
from django.conf import settings
from rest_framework.parsers import MultiPartParser
from tablib import Dataset
from import_export import resources
import pandas as pd

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
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import filters
from . import admin


## Unit Converter

class UnitConverterViewSet(CoreModelViewSet):
    queryset = models.UnitConverter.objects.all()
    serializer_class = serializers.UnitConverterSerializer_GET
    filterset_class = filters.UnitConverterFilter
    search_fields = ['name']
    ordering_fields = '__all__'

class UnitConverterHistoryViewSet(HistoryViewSet):
    queryset = models.UnitConverter.history.all()
    serializer_class = serializers.UnitHistorySerializer

class UnitConverterSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.UnitConverter.all.get(pk=self.id_pk)

## Unit Converter Export
class UnitConverterXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.UnitConverterResource().export()

class UnitConverterXlsExport(XlsExport):
    def get_dataset(self):
        return admin.UnitConverterResource().export()

class UnitConverterCsvExport(CsvExport):
    def get_dataset(self):
        return admin.UnitConverterResource().export()

## Unit Converter Import
class UnitConverterXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.UnitConverterResource()
    
class UnitConverterXlsImport(XlsImport):
    def get_resource(self):
        return admin.UnitConverterResource()

class UnitConverterCsvImport(CsvImport):
    def get_resource(self):
        return admin.UnitConverterResource()


## Unit
class UnitViewSet(CoreModelViewSet):
    queryset = models.Unit.all.all()
    serializer_class = serializers.UnitSerializer_GET
    filterset_class = filters.UnitFilter
    search_fields = ['name']
    ordering_fields = '__all__'

class UnitHistoryViewSet(HistoryViewSet):
    queryset = models.Unit.history.all()
    serializer_class = serializers.UnitHistorySerializer


class UnitSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Unit.all.get(pk=self.id_pk)

## Unit Export
class UnitXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.UnitResource().export()

class UnitXlsExport(XlsExport):
   def get_dataset(self):
        return admin.UnitResource().export()

class UnitCsvExport(CsvExport):
   def get_dataset(self):
        return admin.UnitResource().export()

## Unit Import
class UnitXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.UnitResource()

class UnitXlsImport(XlsImport):
    def get_resource(self):
        return admin.UnitResource()
    
class UnitCsvImport(CsvImport):
    def get_resource(self):
        return admin.UnitResource()