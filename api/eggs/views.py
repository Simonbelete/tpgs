import io
import pandas as pd
import django_filters
from django.shortcuts import render
from rest_framework import viewsets, status,  mixins
from rest_framework.views import APIView
from rest_framework import generics
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
from users.models import User


class EggViewSet(CoreModelViewSet):
    queryset = models.Egg.objects.all()
    serializer_class = serializers.EggSerializer_GET
    filterset_class = filters.EggFilter
    search_fields = ['chicken__tag', 'flock__name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.EggSerializer_POST
        return serializers.EggSerializer_GET


class EggHistoryViewSet(HistoryViewSet):
    queryset = models.Egg.history.all()
    serializer_class = serializers.EggHistorySerializer


class EggSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Egg.all.get(pk=self.id_pk)


class EggExport(GenericExportView):
    queryset = models.Egg.all.all()
    filterset_class = filters.EggResourceFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.EggResource().export(qs.qs)


class EggImport(GenericImportView):
    def get_resource(self):
        return admin.EggResource()
