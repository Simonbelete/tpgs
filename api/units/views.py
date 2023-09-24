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

from core.views import HistoryViewSet, SummaryViewSet, CoreModelViewSet
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import filters

## Unit Converter

class UnitConverterViewSet(viewsets.ModelViewSet):
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

# Xlsx
class UnitConverterXlsxExport(APIView):
    def get(self, request):
        dataset = admin.UnitConverterResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

class UnitConverterXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.UnitConverter)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls
class UnitConverterXlsExport(APIView):
    def get(self, request):
        dataset = admin.UnitConverterResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

class UnitConverterXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.UnitConverter)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv
class UnitConverterCsvExport(APIView):
    def get(self, request):
        dataset = admin.UnitConverterResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

class UnitConverterCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.UnitConverter)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)



## Units

class UnitViewSet(viewsets.ModelViewSet):
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

# Xlsx
class UnitXlsxExport(APIView):
    def get(self, request):
        dataset = admin.UnitResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="units%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

class UnitXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.Unit)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls
class UnitXlsExport(APIView):
    def get(self, request):
        dataset = admin.UnitResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="units%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

class UnitXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.Unit)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv
class UnitCsvExport(APIView):
    def get(self, request):
        dataset = admin.UnitResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

class UnitCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.Unit)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)
