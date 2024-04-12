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


from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    GenericExportView,
    GenericImportView
)
from . import models
from . import serializers
from . import admin
from . import filters


class WeightViewSet(CoreModelViewSet):
    queryset = models.Weight.objects.all()
    serializer_class = serializers.WeightSerializer_GET
    filterset_class = filters.WeightFilter
    search_fields = ['chicken__tag', 'week', 'weight']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.WeightSerializer_POST
        return serializers.WeightSerializer_GET


class WeightHistoryViewSet(HistoryViewSet):
    queryset = models.Weight.history.all()
    serializer_class = serializers.WeightHistorySerializer


class WeightSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Weight.all.get(pk=self.id_pk)


class WeightExport(GenericExportView):
    def get_dataset(self):
        return admin.WeightResource().export()


class WeightImport(GenericImportView):
    def get_resource(self):
        return admin.WeightResource()
