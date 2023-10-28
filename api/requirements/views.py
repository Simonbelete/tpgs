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