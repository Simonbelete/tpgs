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

from core.views import HistoryViewSet, SummaryViewSet, CoreModelViewSet
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin
from . import filters


class FeedViewSet(CoreModelViewSet):
    queryset = models.Feed.objects.all()
    serializer_class = serializers.FeedSerializer_GET
    filterset_class = filters.FeedFilter
    search_fields = ['chicken__tag', 'hatchery__name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.FeedSerializer_POST
        return serializers.FeedSerializer_GET


class FeedHistoryViewSet(HistoryViewSet):
    queryset = models.Feed.history.all()
    serializer_class = serializers.FeedHistorySerializer


class FeedSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Feed.all.get(pk=self.id_pk)

# Xlsx


class FeedXlsxExport(APIView):
    def get(self, request):
        dataset = admin.FeedResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="feed_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FeedXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Feed)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls


class FeedXlsExport(APIView):
    def get(self, request):
        dataset = admin.FeedResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="feed_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FeedXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Feed)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv


class FeedCsvExport(APIView):
    def get(self, request):
        dataset = admin.FeedResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="feed_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FeedCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(model=models.Feed)()
        result = resource.import_data(dataset, dry_run=True, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)
