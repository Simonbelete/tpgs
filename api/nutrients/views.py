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

#
# Nutrient Group
#


class NutrientGroupViewSet(viewsets.ModelViewSet):
    queryset = models.NutrientGroup.objects.all()
    serializer_class = serializers.NutrientGroupSerializer_GET


class NutrientGroupHistoryViewSet(HistoryViewSet):
    queryset = models.NutrientGroup.history.all()
    serializer_class = serializers.NutrientGroupHistorySerializer

# Xlsx


class NutrientGroupXlsxExport(APIView):
    def get(self, request):
        dataset = admin.NutrientGroupResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="nutrient_groups_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class NutrientGroupXlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.NutrientGroup)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Xls


class NutrientGroupXlsExport(APIView):
    def get(self, request):
        dataset = admin.NutrientGroupResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="nutrient_groups_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class NutrientGroupXlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.NutrientGroup)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)

# Csv


class NutrientGroupCsvExport(APIView):
    def get(self, request):
        dataset = admin.NutrientGroupResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="nutrient_groups%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class NutrientGroupCsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = resources.modelresource_factory(
            model=models.NutrientGroup)()
        result = resource.import_data(dataset, raise_errors=True)
        if not result.has_errors():
            return JsonResponse({'message': 'Imported Successfully'}, status=200)
        return JsonResponse({'errors': ['Import Failed']}, status=400)


#
# Nutrient
#

class NutrientViewSet(viewsets.ModelViewSet):
    queryset = models.Nutrient.objects.all()
    serializer_class = serializers.NutrientSerializer_GET

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.NutrientSerializer_GET
        return serializers.NutrientSerializer_POST
