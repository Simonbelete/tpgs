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


class PurposeViewSet(CoreModelViewSet):
    queryset = models.Purpose.all.all()
    serializer_class = serializers.PurposeSerializer_GET
    filterset_class = filters.PurposeFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.PurposeSerializer_POST
        return serializers.PurposeSerializer_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PurposeHistoryViewSet(HistoryViewSet):
    queryset = models.Purpose.history.all()
    serializer_class = serializers.PurposeHistorySerializer


class PurposeSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Purpose.all.get(pk=self.id_pk)


class BreedExport(GenericExportView):
    def get_dataset(self):
        return admin.PurposeResource().export()


class BreedImport(GenericImportView):
    def get_resource(self):
        return admin.PurposeResource()
