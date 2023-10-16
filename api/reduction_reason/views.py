from django.shortcuts import render

# Create your views here.
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
    XlsxExport
)
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin
from . import filters


class ReductionReasonViewSet(CoreModelViewSet):
    queryset = models.ReductionReason.all.all()
    serializer_class = serializers.ReductionReasonSerializer_GET
    filterset_class = filters.ReductionReasonFilter
    search_fields = ['name']
    ordering_fields = '__all__'


class ReductionReasonHistoryViewSet(HistoryViewSet):
    queryset = models.ReductionReason.history.all()
    serializer_class = serializers.ReductionReasonHistorySerializer


class ReductionReasonSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.ReductionReason.all.get(pk=self.id_pk)


# Xlsx
class ReductionReasonXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.ReductionReasonResource().export()
