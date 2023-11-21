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


class FeedExport(GenericExportView):
    queryset = models.Feed.all.all()
    filterset_class = filters.FeedResourceFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.FeedResource().export(qs.qs)


class FeedImport(GenericImportView):
    def get_resource(self):
        return admin.FeedResource()
