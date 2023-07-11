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


class StageFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Stage
        fields = ['name']


class StageViewSet(viewsets.ModelViewSet):
    queryset = models.Stage.objects.all()
    serializer_class = serializers.StageSerializer_GET
    filterset_class = StageFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.StageSerializer_POST
        return serializers.StageSerializer_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class StageHistoryViewSet(HistoryViewSet):
    queryset = models.Stage.history.all()
    serializer_class = serializers.StageHistorySerializer


# Xlsx

class StageXlsxExport(APIView):
    def get(self, request):
        dataset = admin.StageResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="stages_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class StageXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Stage)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls


class StageXlsExport(APIView):
    def get(self, request):
        dataset = admin.StageResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class StageXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Stage)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv


class StageCsvExport(APIView):
    def get(self, request):
        dataset = admin.StageResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class StageCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Stage)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)
