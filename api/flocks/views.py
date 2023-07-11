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
from rest_framework.parsers import FormParser, MultiPartParser
from tablib import Dataset


from core.views import HistoryViewSet
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin


class FlockFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Flock
        fields = ['name']


class FlockViewSet(viewsets.ModelViewSet):
    queryset = models.Flock.objects.all()
    serializer_class = serializers.FlockSerializer_GET
    filterset_class = FlockFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.FlockSerializer_POST
        return serializers.FlockSerializer_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class FlockHistoryViewSet(HistoryViewSet):
    queryset = models.Flock.history.all()
    serializer_class = serializers.FlockHistorySerializer

# Xlsx


class FlockXlsxExport(APIView):
    def get(self, request):
        dataset = admin.FlockResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FlockXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Flock)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls


class FlockXlsExport(APIView):
    def get(self, request):
        dataset = admin.FlockResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FlockXlsImport(APIView):
    serializer_class = UploadSerializer
     parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Flock)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv


class FlockCsvExport(APIView):
    def get(self, request):
        dataset = admin.FlockResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FlockCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Flock)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)
