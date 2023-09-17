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

from core.views import HistoryViewSet, SummaryViewSet
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin


class HouseViewSet(viewsets.ModelViewSet):
    queryset = models.House.objects.all()
    serializer_class = serializers.HouseSerializer_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class HouseHistoryViewSet(HistoryViewSet):
    queryset = models.House.history.all()
    serializer_class = serializers.HouseHistorySerializer

class HouseSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.House.objects.get(pk=self.id_pk) 


# Xlsx
class HouseXlsxExport(APIView):
    def get(self, request):
        dataset = admin.HouseResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class HouseXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.House)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls


class HouseXlsExport(APIView):
    def get(self, request):
        dataset = admin.HouseResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class HouseXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.House)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv


class HouseCsvExport(APIView):
    def get(self, request):
        dataset = admin.HouseResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class HouseCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.House)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)
