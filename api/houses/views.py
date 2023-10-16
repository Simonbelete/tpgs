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


class HouseViewSet(CoreModelViewSet):
    queryset = models.House.all.all()
    # all_queryset = models.House.all.all()
    serializer_class = serializers.HouseSerializer_GET
    filterset_class = filters.HouseFilter
    search_fields = ['name']
    ordering_fields = '__all__'


class HouseHistoryViewSet(HistoryViewSet):
    queryset = models.House.history.all()
    serializer_class = serializers.HouseHistorySerializer


class HouseSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.House.all.get(pk=self.id_pk)

## House Export
class HouseXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.HouseResource().export()

class HouseXlsExport(XlsExport):
    def get_dataset(self):
        return admin.HouseResource().export()

class HouseCsvExport(CsvExport):
    def get_dataset(self):
        return admin.HouseResource().export()

## House Import
class HouseXlsxImport(XlsxImport):
    def get_model(self):
        return models.House

class HouseXlsImport(XlsxImport):
    def get_model(self):
        return models.House

class HouseCsvImport(CsvImport):
    def get_model(self):
        return models.House