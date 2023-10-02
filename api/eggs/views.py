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


from core.views import HistoryViewSet
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin
from . import filters

class EggViewSet(viewsets.ModelViewSet):
    queryset = models.Egg.objects.all()
    serializer_class = serializers.EggSerializer_GET
    filterset_class = filters.EggFilter
    search_fields = ['tag']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.EggSerializer_POST
        return serializers.EggSerializer_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EggHistoryViewSet(HistoryViewSet):
    queryset = models.Egg.history.all()
    serializer_class = serializers.EggHistorySerializer


# Xlsx

class EggXlsxExport(APIView):
    def get(self, request):
        dataset = admin.EggResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="eggs_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class EggXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Egg)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls


class EggXlsExport(APIView):
    def get(self, request):
        dataset = admin.EggResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="eggs_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class EggXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Egg)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv


class EggCsvExport(APIView):
    def get(self, request):
        dataset = admin.EggResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="eggs_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class EggCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Egg)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)
