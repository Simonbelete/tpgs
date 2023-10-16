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

from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    XlsxExport,
    XlsExport,
    CsvExport,
    XlsxImport,
    XlsImport,
    CsvImport
)
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin
from . import filters

class PenViewSet(CoreModelViewSet):
    queryset = models.Pen.all.all()
    serializer_class = serializers.PenSerializer_GET
    filterset_class = filters.PenFilter
    search_fields = ['name']
    ordering_fields = '__all__'

class PenHistoryViewSet(HistoryViewSet):
    queryset = models.Pen.history.all()
    serializer_class = serializers.PenHistorySerializer


class PenSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Pen.all.get(pk=self.id_pk)

## Pen Export
class PenXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.PenResource().export()

class PenXlsExport(XlsExport):
    def get_dataset(self):
        return admin.PenResource().export()

class PenCsvExport(CsvExport):
    def get_dataset(self):
        return admin.PenResource().export()

## Pen Import
class PenXlsxImport(XlsxImport):
    def get_model(self):
        return models.Pen

class PenXlsImport(XlsxImport):
    def get_model(self):
        return models.Pen

class PenCsvImport(CsvImport):
    def get_model(self):
        return models.Pen