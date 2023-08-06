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

from core.views import HistoryViewSet
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin

# Create your views here.


class BreedViewSet(viewsets.ModelViewSet):
    queryset = models.Breed.objects.all()
    serializer_class = serializers.BreedSerializer_GET


class BreedHistoryViewSet(HistoryViewSet):
    queryset = models.Breed.history.all()
    serializer_class = serializers.BreedHistorySerializer

# Xlsx


class BreedXlsxExport(APIView):
    def get(self, request):
        dataset = admin.BreedResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_data_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class BreedXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.Breed)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls


class BreedXlsExport(APIView):
    def get(self, request):
        dataset = admin.BreedResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_data_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class BreedXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.Breed)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv


class BreedCsvExport(APIView):
    def get(self, request):
        dataset = admin.BreedResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_data%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class BreedCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.Breed)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Breed HDEP Guid


class BreedHDEPGuideViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BreedHDEPGuideSerializer_GET

    def get_queryset(self):
        return models.BreedHDEPGuid.objects.filter(breed=self.kwargs['breed_pk'])

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedHDEPGuideSerializer_POST
        return serializers.BreedHDEPGuideSerializer_GET


# Breed HHEP Guid


class BreedHHEPGuideViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BreedHHEPGuideSerializer_GET

    def get_queryset(self):
        return models.BreedHHEPGuid.objects.filter(breed=self.kwargs['breed_pk'])

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedHHEPGuideSerializer_POST
        return serializers.BreedHHEPGuideSerializer_GET

# Breed Weight Guide


class BreedWeightGuideViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BreedWeightGuideSerializer_GET

    def get_queryset(self):
        return models.BreedWeightGuide.objects.filter(breed=self.kwargs['breed_pk'])

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedWeightGuideSerializer_POST
        return serializers.BreedWeightGuideSerializer_GET
