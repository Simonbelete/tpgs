from typing import Any
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    GenericExportView,
    GenericImportView
)
from core.pagination import AllPagination
from . import models
from . import serializers
from . import admin
from . import filters

# Hatchery


class HatcheryViewSet(CoreModelViewSet):
    queryset = models.Hatchery.objects.all()
    serializer_class = serializers.HatcherySerializer_GET
    filterset_class = filters.HatcheryFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.HatcherySerializer_POST
        return serializers.HatcherySerializer_GET


class HatcheryHistoryViewSet(HistoryViewSet):
    queryset = models.Hatchery.history.all()
    serializer_class = serializers.HatcheryHistorySerializer


class HatcherySummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Hatchery.all.get(pk=self.id_pk)


class HatcheryExport(GenericExportView):
    def get_dataset(self):
        return admin.HatcheryResource().export()


class HatcheryImport(GenericImportView):
    def get_resource(self):
        return admin.HatcheryResource()


# Hatchery Eggs
class HatcheryEggViewSet(CoreModelViewSet):
    queryset = models.HatcheryEgg.all.all()
    serializer_class = serializers.HatcheryEggSerializer_GET

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        if ('hatchery_pk' in kwargs):
            self.pagination_class = AllPagination

    def get_queryset(self):
        if ('hatchery_pk' in self.kwargs):
            return self.queryset.filter(hatchery=self.kwargs['hatchery_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.HatcheryEggSerializer_POST
        return serializers.HatcheryEggSerializer_GET


class HatcheryEggExport(GenericExportView):
    def get_dataset(self):
        return admin.HatcheryEggResource().export()


class HatcheryEggImport(GenericImportView):
    def get_resource(self):
        return admin.HatcheryEggResource()


class HatcheryEggHistoryViewSet(HistoryViewSet):
    queryset = models.HatcheryEgg.history.all()
    serializer_class = serializers.HatcheryEggHistorySerializer


class HatcheryEggSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.HatcheryEgg.all.get(pk=self.id_pk)


# Incubations
class IncubationViewSet(CoreModelViewSet):
    queryset = models.Incubation.all.all()
    serializer_class = serializers.IncubationSerializer_GET

    def get_queryset(self):
        if ('hatchery_pk' in self.kwargs):
            return self.queryset.filter(hatchery=self.kwargs['hatchery_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.IncubationSerializer_POST
        return serializers.IncubationSerializer_GET


class IncubationExport(GenericExportView):
    def get_dataset(self):
        return admin.IncubationResource().export()


class IncubationImport(GenericImportView):
    def get_resource(self):
        return admin.IncubationResource()


class IncubationHistoryViewSet(HistoryViewSet):
    queryset = models.Incubation.history.all()
    serializer_class = serializers.IncubationHistorySerializer


class IncubationSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Incubation.all.get(pk=self.id_pk)


class HatcheryLastStage(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Hatchery.all.get(pk=self.kwargs['id'])
        except models.Hatchery.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, id=None, **kwargs):
        queryset = self.get_queryset()

        return Response({
            'last_stage': queryset.dm,
            'culled_count': queryset.price,
            'selected_chs'
            'nutrient_count': queryset.nutrient_count(),
            'composition_total': queryset.composition_total()
        }, status=200)
