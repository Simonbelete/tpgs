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

from core.views import HistoryViewSet, SummaryViewSet, CoreModelViewSet
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin
from . import filters

#### Ingredient type 
class IngredientTypeViewSet(viewsets.ModelViewSet):
    queryset = models.IngredientType.objects.all()
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

# Xlsx
class IngredientTypeXlsxExport(APIView):
    def get(self, request):
        dataset = admin.IngredientTypeResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="ingredients_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
class IngredientTypeXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.IngredientType)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls
class IngredientTypeXlsExport(APIView):
    def get(self, request):
        dataset = admin.IngredientTypeResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="ingredient_types_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
class IngredientTypeXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.IngredientType)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv
class IngredientTypeCsvExport(APIView):
    def get(self, request):
        dataset = admin.IngredientTypeResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="ingredient_type_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
class IngredientTypeCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.IngredientType)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)


#### Ingredient
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

# Xlsx
class IngredientXlsxExport(APIView):
    def list(self, request):
        dataset = admin.IngredientResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="ingredients_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
class IngredientXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Ingredient)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls
class IngredientXlsExport(APIView):
    def get(self, request):
        dataset = admin.IngredientResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="ingredient_types_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
class IngredientXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Ingredient)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv
class IngredientCsvExport(APIView):
    def get(self, request):
        dataset = admin.IngredientResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="ingredient_type_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
class IngredientCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Ingredient)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)


class IngredientNutrientViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.IngredientNutrientSerializer_GET

    def get_queryset(self):
        return models.IngredientNutrient.objects.filter(ingredient=self.kwargs['ingredient_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.IngredientNutrientSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.IngredientNutrientSerializer_PATCH
        return serializers.IngredientNutrientSerializer_GET
