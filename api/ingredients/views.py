import io
import pandas as pd
import django_filters
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from datetime import date
from django.conf import settings
from import_export import resources
from rest_framework.parsers import MultiPartParser
from tablib import Dataset
from rest_framework.response import Response
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

## Ingredient type 
class IngredientTypeViewSet(CoreModelViewSet):
    queryset = models.IngredientType.all.all()
    serializer_class = serializers.IngredientTypeSerializer_GET
    filterset_class = filters.IngredientTypeFilter
    search_fields = ['name']
    ordering_fields = '__all__'

class IngredientTypeHistoryViewSet(HistoryViewSet):
    queryset = models.IngredientType.history.all()
    serializer_class = serializers.IngredientTypeHistorySerializer

class IngredientTypeSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.IngredientType.all.get(pk=self.id_pk)

## Ingredient type export
class IngredientTypeXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.IngredientTypeResource().export()

class IngredientTypeXlsExport(XlsExport):
    def get_dataset(self):
        return admin.IngredientTypeResource().export()

class IngredientTypeCsvExport(CsvExport):
    def get_dataset(self):
        return admin.IngredientTypeResource().export()

## Ingredient type import
class IngredientTypeXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.IngredientTypeResource
    
class IngredientTypeXlsImport(XlsImport):
    def get_resource(self):
        return admin.IngredientTypeResource
        
class IngredientTypeCsvImport(CsvImport):
    def get_resource(self):
        return admin.IngredientTypeResource
        

## Ingredient
class IngredientViewSet(viewsets.ModelViewSet):
    queryset = models.Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer_GET
    filterset_class = filters.IngredientFilter
    search_fields = ['name', 'code']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.IngredientSerializer_POST
        return serializers.IngredientSerializer_GET

class IngredientHistoryViewSet(HistoryViewSet):
    queryset = models.Ingredient.history.all()
    serializer_class = serializers.IngredientHistorySerializer

class IngredientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Ingredient.all.get(pk=self.id_pk)

class IngredientAnalysesViewSet(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Ingredient.all.get(pk=self.kwargs['id'])
        except models.Ingredient.DoesNotExist as ex:
            raise NotFound()
    
    def list(self, request, id=None, **kwargs):
        queryset = self.get_queryset()

        return Response({
            'dm': queryset.dm,
            'price': queryset.price,
            'nutrient_count': queryset.nutrient_count(),
            'composition_total': queryset.composition_total()
        }, status=200)

## Ingredient Export
class IngredientXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.IngredientResource().export()

class IngredientXlsExport(XlsExport):
    def get_dataset(self):
        return admin.IngredientResource().export()

class IngredientCsvExport(CsvExport):
    def get_dataset(self):
        return admin.IngredientResource().export()
      

## Ingredient Import        
class IngredientXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.IngredientResource()

class IngredientXlsImport(XlsImport):
    def get_resource(self):
        return admin.IngredientResource()

class IngredientCsvImport(CsvImport):
    def get_resource(self):
        return admin.IngredientResource()


class IngredientNutrientViewSet(viewsets.ModelViewSet):
    pagination_class = AllPagination
    serializer_class = serializers.IngredientNutrientSerializer_GET

    def get_queryset(self):
        return models.IngredientNutrient.objects.filter(ingredient=self.kwargs['ingredient_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.IngredientNutrientSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.IngredientNutrientSerializer_PATCH
        return serializers.IngredientNutrientSerializer_GET

## Ingredient Nutrients
class AllIngredientNutrientViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.IngredientNutrientSerializer_GET

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.IngredientNutrientSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.IngredientNutrientSerializer_PATCH
        return serializers.IngredientNutrientSerializer_GET


## Ingredient Export
class IngredientNutrientXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.IngredientNutrientResource().export()

class IngredientNutrientXlsExport(XlsExport):
    def get_dataset(self):
        return admin.IngredientNutrientResource().export()

class IngredientNutrientCsvExport(CsvExport):
    def get_dataset(self):
        return admin.IngredientNutrientResource().export()
      

## Ingredient Nutrient Import        
class IngredientNutrientXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.IngredientNutrientResource()

class IngredientNutrientXlsImport(XlsImport):
    def get_resource(self):
        return admin.IngredientNutrientResource()

class IngredientNutrientCsvImport(CsvImport):
    def get_resource(self):
        return admin.IngredientNutrientResource()
