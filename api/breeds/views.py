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
    CsvImport,
    GenericExportView
)
from core.serializers import UploadSerializer
from . import models
from . import serializers
from . import admin

## Breed
class BreedViewSet(viewsets.ModelViewSet):
    queryset = models.Breed.objects.all()
    serializer_class = serializers.BreedSerializer_GET
    
    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedSerializer_POST
        return serializers.BreedSerializer_GET


class BreedHistoryViewSet(HistoryViewSet):
    queryset = models.Breed.history.all()
    serializer_class = serializers.BreedHistorySerializer

## Breed Import & Export
class BreedXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.BreedResource().export()

class BreedXlsExport(XlsExport):
    def get_dataset(self):
        return admin.BreedResource().export()

class BreedCsvExport(CsvExport):
    def get_dataset(self):
        return admin.BreedResource().export()
    
class BreedXlsxImport(XlsxImport):
    def get_dataset(self):
        return admin.BreedResource().export()
    
class BreedXlsImport(XlsImport):
    def get_dataset(self):
        return admin.BreedResource().export()

class BreedCsvImport(CsvImport):
    def get_dataset(self):
        return admin.BreedResource().export()


# Breed HDEP Guid
class BreedHDEPGuideViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BreedHDEPGuideSerializer_GET

    def get_queryset(self):
        return models.BreedHDEPGuid.objects.filter(breed=self.kwargs['breed_pk'])

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedHDEPGuideSerializer_POST
        return serializers.BreedHDEPGuideSerializer_GET


# Breed HHEP Guid
class BreedHHEPGuideViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BreedHHEPGuideSerializer_GET

    def get_queryset(self):
        return models.BreedHHEPGuid.objects.filter(breed=self.kwargs['breed_pk'])

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedHHEPGuideSerializer_POST
        return serializers.BreedHHEPGuideSerializer_GET


## Breed Weight Guide
class BreedWeightGuideViewSet(viewsets.ModelViewSet):
    queryset = models.BreedWeightGuide.all.all()
    serializer_class = serializers.BreedWeightGuideSerializer_GET

    def get_queryset(self):
        if('breed_pk' in self.kwargs):
            return self.queryset.filter(breed=self.kwargs['breed_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedWeightGuideSerializer_POST
        return serializers.BreedWeightGuideSerializer_GET


## Breed Weight Guid Import & Export
class BreedWeightGuideImportExport(GenericExportView):
    def get_dataset(self):
        return admin.BreedWeightGuideResource().export()
    
## Feed Guide
class FeedGuideViewSet(viewsets.ModelViewSet):
    queryset = models.BreedWeightGuide.objects.all()
    serializer_class = serializers.FeedGuideSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.FeedGuideSerializer_POST
        return serializers.FeedGuideSerializer_GET

## Feed Guide Import & Export
class FeedGuideXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.BreedFeedGuideResource().export()

class FeedGuideXlsExport(XlsExport):
    def get_dataset(self):
        return admin.BreedFeedGuideResource().export()

class FeedGuideCsvExport(CsvExport):
    def get_dataset(self):
        return admin.BreedFeedGuideResource().export()
    
class FeedGuideXlsxImport(XlsxImport):
    def get_dataset(self):
        return admin.BreedFeedGuideResource().export()
    
class FeedGuideXlsImport(XlsImport):
    def get_dataset(self):
        return admin.BreedFeedGuideResource().export()

class FeedGuideCsvImport(CsvImport):
    def get_dataset(self):
        return admin.BreedFeedGuideResource().export()
    
    
## Egg Guide
class EggGuideViewSet(viewsets.ModelViewSet):
    queryset = models.BreedEggGuide.objects.all()
    serializer_class = serializers.EggGuideSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.EggGuideSerializer_POST
        return serializers.EggGuideSerializer_GET

## Egg Guide Import & Export
class EggGuideXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.BreedEggGuideResource().export()

class EggGuideXlsExport(XlsExport):
    def get_dataset(self):
        return admin.BreedEggGuideResource().export()

class EggGuideCsvExport(CsvExport):
    def get_dataset(self):
        return admin.BreedEggGuideResource().export()
    
class EggGuideXlsxImport(XlsxImport):
    def get_dataset(self):
        return admin.BreedEggGuideResource().export()
    
class EggGuideXlsImport(XlsImport):
    def get_dataset(self):
        return admin.BreedEggGuideResource().export()

class EggGuideCsvImport(CsvImport): 
    def get_dataset(self):
        return admin.BreedEggGuideResource().export()