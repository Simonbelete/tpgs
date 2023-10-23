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
from rest_framework.permissions import DjangoModelPermissions

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
from . import admin
from . import filters

##
## Nutrient Group
##

class NutrientGroupViewSet(CoreModelViewSet):
    permission_classes = [DjangoModelPermissions]
    queryset = models.NutrientGroup.all.all()
    serializer_class = serializers.NutrientGroupSerializer_GET
    filterset_class = filters.NutrientGroupFilter
    search_fields = ['name']
    ordering_fields = '__all__'

class NutrientGroupHistoryViewSet(HistoryViewSet):
    queryset = models.NutrientGroup.history.all()
    serializer_class = serializers.NutrientGroupHistorySerializer

class NutrientGroupSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.NutrientGroup.all.get(pk=self.id_pk)

## Nutrient Group Export
class NutrientGroupXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.NutrientGroupResource().export()

class NutrientGroupXlsExport(XlsExport):
    def get_dataset(self):
        return admin.NutrientGroupResource().export()

class NutrientGroupCsvExport(CsvExport):
    def get_dataset(self):
        return admin.NutrientGroupResource().export()

## Nutrient Group Import
class NutrientGroupXlsxImport(XlsxImport):
    def get_model(self):
        return models.NutrientGroup

class NutrientGroupXlsImport(XlsImport):
    def get_model(self):
        return models.NutrientGroup

class NutrientGroupCsvImport(CsvImport):
    def get_model(self):
        return models.NutrientGroup

##
## Nutrient
##
class NutrientViewSet(CoreModelViewSet):
    queryset = models.Nutrient.all.all()
    serializer_class = serializers.NutrientSerializer_GET
    filterset_class = filters.NutrientFilter
    search_fields = ['code', 'name', 'abbreviation']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.NutrientSerializer_GET
        return serializers.NutrientSerializer_POST

class NutrientHistoryViewSet(HistoryViewSet):
    queryset = models.Nutrient.history.all()
    serializer_class = serializers.NutrientHistorySerializer
    
class NutrientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Nutrient.all.get(pk=self.id_pk)

class NutrientXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.NutrientResource().export()

class NutrientXlsExport(XlsExport):
    def get_dataset(self):
        return admin.NutrientResource().export()

class NutrientCsvExport(CsvExport):
   def get_dataset(self):
        return admin.NutrientResource().export()

class NutrientXlsxImport(XlsxImport):
    def get_model(self):
        return models.Nutrient
    
class NutrientXlsImport(XlsImport):
    def get_model(self):
        return models.Nutrient

class NutrientCsvImport(CsvImport):
    def get_model(self):
        return models.Nutrient