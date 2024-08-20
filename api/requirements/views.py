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
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated

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


class RequirementViewSet(CoreModelViewSet):
    queryset = models.Requirement.all.all()
    serializer_class = serializers.RequirementSerializer_GET
    filterset_class = filters.RequirementFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.RequirementSerializer_GET
        return serializers.RequirementSerializer_POST


class RequirementHistoryViewSet(HistoryViewSet):
    queryset = models.Requirement.history.all()
    serializer_class = serializers.RequirementHistorySerializer


class RequirementSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Requirement.all.get(pk=self.id_pk)


class RequirementExport(GenericExportView):
    def get_dataset(self):
        return admin.RequirementResource().export()


class RequirementImport(GenericImportView):
    def get_resource(self):
        return admin.RequirementResource()


# Requirement Nutrients
class RequirementNutrientViewSet(CoreModelViewSet):
    queryset = models.RequirementNutrient.all.all()
    serializer_class = serializers.RequirementNutrientSerializer_GET
    filterset_class = filters.RequirementNutrientFilter
    ordering_fields = ['nutrient__name',
                       'nutrient__abbreviation', 'nutrient__unit', 'value']
    search_fields = ['nutrient__name', 'nutrient__abbreviation', 'value']

    def get_queryset(self):
        if ('requirement_pk' in self.kwargs):
            return self.queryset.filter(requirement=self.kwargs['requirement_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.RequirementNutrientSerializer_POST
        return serializers.RequirementNutrientSerializer_GET


class AllRequirementNutrientViewSet(viewsets.ReadOnlyModelViewSet):
    """ Get all active nutrients of ingredient"""
    queryset = models.RequirementNutrient.objects.all().order_by('-nutrient__order')
    pagination_class = AllPagination
    serializer_class = serializers.AllRequirementNutrientSerializer_GET

    def get_queryset(self):
        if ('requirement_pk' in self.kwargs):
            return self.queryset.filter(requirement=self.kwargs['requirement_pk'])
        return self.queryset


class RequirementNutrientHistoryViewSet(HistoryViewSet):
    queryset = models.RequirementNutrient.history.all()
    serializer_class = serializers.RequirementNutrientHistorySerializer


class RequirementNutrientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.RequirementNutrient.all.get(pk=self.id_pk)


class RequirementNutrientExport(GenericExportView):
    def get_dataset(self):
        return admin.RequirementNutrientResource().export()


class RequirementNutrientImport(GenericImportView):
    def get_resource(self):
        return admin.RequirementNutrientResource()


class RequirementAnalysesViewSet(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Requirement.all.get(pk=self.kwargs['id'])
        except models.Requirement.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, id=None, **kwargs):
        queryset = self.get_queryset()

        return Response({
            'weight': queryset.weight,
            'desired_dm': queryset.desired_dm,
            'budget': queryset.budget,
            'nutrient_count': queryset.nutrient_count(),
            'composition_total': queryset.composition_total()
        }, status=200)

# Requirement Ingredient


class RequirementIngredientViewSet(CoreModelViewSet):
    queryset = models.RequirementIngredient.all.all()
    serializer_class = serializers.RequirementIngredientSerializer_GET
    filterset_class = filters.RequirementIngredientFilter
    ordering_fields = 'all'
    search_fields = ['ingredient__name']

    def get_queryset(self):
        if ('requirement_pk' in self.kwargs):
            return self.queryset.filter(requirement=self.kwargs['requirement_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.RequirementIngredientSerializer_POST
        return serializers.RequirementIngredientSerializer_GET


class AllRequirementIngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.RequirementIngredient.objects.all()
    pagination_class = AllPagination
    serializer_class = serializers.AllRequirementIngredientSerializer_GET

    def get_queryset(self):
        if ('requirement_pk' in self.kwargs):
            return self.queryset.filter(requirement=self.kwargs['requirement_pk'])
        return self.queryset


class RequirementIngredientHistoryViewSet(HistoryViewSet):
    queryset = models.RequirementIngredient.history.all()
    serializer_class = serializers.RequirementIngredientHistorySerializer


class RequirementIngredientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.RequirementIngredient.all.get(pk=self.id_pk)


class RequirementIngredientExport(GenericExportView):
    def get_dataset(self):
        return admin.RequirementIngredientResource().export()


class RequirementIngredientImport(GenericImportView):
    def get_resource(self):
        return admin.RequirementIngredientResource()
