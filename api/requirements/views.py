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
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

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
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin
from . import filters

class RequirementViewSet(CoreModelViewSet):
    queryset = models.Requirement.all.all()
    serializer_class = serializers.RequirementSerializer_GET
    filterset_class = filters.RequirementFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.RequirementSerializer_GET
        return serializers.RequirementSerializer_POST

class RequirementHistoryViewSet(HistoryViewSet):
    queryset = models.Requirement.history.all()
    serializer_class = serializers.RequirementHistorySerializer

class RequirementSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Requirement.all.get(pk=self.id_pk)


## Requirement Export
class RequirementXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.RequirementResource().export()

class RequirementXlsExport(XlsExport):
    def get_dataset(self):
        return admin.RequirementResource().export()

class RequirementCsvExport(CsvExport):
    def get_dataset(self):
        return admin.RequirementResource().export()

## Requirement Import
class RequirementXlsxImport(XlsxImport):
    def get_model(self):
        return models.Requirement

class RequirementXlsImport(XlsImport):
    def get_model(self):
        return models.Requirement

class RequirementCsvImport(CsvImport):
    def get_model(self):
        return models.Requirement
    
class RequirementNutrientViewSet(CoreModelViewSet):
    pagination_class = AllPagination
    serializer_class = serializers.RequirementNutrientSerializer_GET

    def get_queryset(self):
        try:
            return models.RequirementNutrient.all.filter(requirement=self.kwargs['requirement_pk'])
        except models.RequirementNutrient.DoesNotExist as ex:
            raise NotFound()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.RequirementNutrientSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.RequirementNutrientSerializer_PATCH
        return serializers.RequirementNutrientSerializer_GET
    
class RequirementAnalysesViewSet(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Requirement.all.get(pk=self.kwargs['id'])
        except models.Requirement.DoesNotExist as ex:
            raise NotFound()
    
    def list(self, request, id=None, **kwargs):
        queryset = self.get_queryset()

        return Response({
            'weight': queryset.weight,
            'desired_dm': queryset.desired_dm,
            'budget': queryset.budget,
            'nutrient_count': queryset.nutrient_count(),
            'composition_total': queryset.composition_total()
        }, status=200)