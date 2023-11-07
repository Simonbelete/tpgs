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
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .tasks import build_pedigree_tree

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


class ChickenViewSet(CoreModelViewSet):
    queryset = models.Chicken.all.all()
    serializer_class = serializers.ChickenSerializer_GET
    filterset_class = filters.ChickenFilter
    search_fields = ['tag']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.ChickenSerializer_POST
        return serializers.ChickenSerializer_GET


class ChickenHistoryViewSet(HistoryViewSet):
    queryset = models.Chicken.history.all()
    serializer_class = serializers.ChickenHistorySerializer


class ChickenSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Chicken.all.get(pk=self.id_pk)


class ChickenOffspringViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChickenSerializer_GET

    def list(self, request, id=None, **kwargs):
        id = self.kwargs['id']

        queryset = models.Chicken.all.get(pk=id).offspring()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ChickenAncestorViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChickenSerializer_GET

    def list(self, request, id=None, **kwargs):
        id = self.kwargs['id']

        queryset = list(models.Chicken.all.get(pk=id).ancestors())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SiblingsViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChickenSerializer_GET

    def get_queryset(self):
        try:
            queryset = models.Chicken.all.get(pk=self.kwargs['id'])
            return queryset
        except models.Chicken.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, id=None, **kwargs):
        id = self.kwargs['id']

        chicken = self.get_queryset()
        queryset = []
        if (chicken.sire and chicken.dam):
            queryset = models.Chicken.objects.exclude(
                pk=chicken.id).filter(sire=chicken.sire, dam=chicken.dam)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# Chicken Export
class ChickenXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.ChickenResource().export()


class ChickenXlsExport(XlsExport):
    def get_dataset(self):
        return admin.ChickenResource().export()


class ChickenCsvExport(CsvExport):
    def get_dataset(self):
        return admin.ChickenResource().export()

# Chicken Import


class ChickenXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.ChickenResource()


class ChickenXlsImport(XlsImport):
    def get_resource(self):
        return admin.ChickenResource()


class ChickenCsvImport(CsvImport):
    def get_resource(self):
        return admin.ChickenResource()
