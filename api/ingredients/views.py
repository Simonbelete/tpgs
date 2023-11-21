from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import viewsets

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

# Ingredient type


class IngredientTypeViewSet(CoreModelViewSet):
    queryset = models.IngredientType.all.all()
    serializer_class = serializers.IngredientTypeSerializer_GET
    filterset_class = filters.IngredientTypeFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.IngredientTypeSerializer_POST
        return serializers.IngredientTypeSerializer_GET


class IngredientTypeHistoryViewSet(HistoryViewSet):
    queryset = models.IngredientType.history.all()
    serializer_class = serializers.IngredientTypeHistorySerializer


class IngredientTypeSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.IngredientType.all.get(pk=self.id_pk)


class IngredientTypeExport(GenericExportView):
    queryset = models.IngredientType.objects.all()
    filterset_class = filters.IngredientTypeFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.IngredientTypeResource().export(qs.qs)


class IngredientTypeImport(GenericImportView):
    def get_resource(self):
        return admin.IngredientTypeResource()


# Ingredient

class IngredientViewSet(CoreModelViewSet):
    queryset = models.Ingredient.all.all()
    serializer_class = serializers.IngredientSerializer_GET
    filterset_class = filters.IngredientFilter
    search_fields = ['name', 'code']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.IngredientSerializer_POST
        return serializers.IngredientSerializer_GET


class IngredientHistoryViewSet(HistoryViewSet):
    queryset = models.Ingredient.history.all()
    serializer_class = serializers.IngredientHistorySerializer


class IngredientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Ingredient.all.get(pk=self.id_pk)


class IngredientExport(GenericExportView):
    queryset = models.Ingredient.all.all()
    filterset_class = filters.IngredientFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.IngredientResource().export(qs.qs)


class IngredientImport(GenericImportView):
    def get_resource(self):
        return admin.IngredientResource()


class IngredientAnalysesViewSet(viewsets.ViewSet):
    def get_queryset(self):
        try:
            return models.Ingredient.all.get(pk=self.kwargs['id'])
        except models.Ingredient.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, id=None, **kwargs):
        queryset = self.get_queryset()

        return Response({
            'dm': queryset.dm,
            'price': queryset.price,
            'nutrient_count': queryset.nutrient_count(),
            'composition_total': queryset.composition_total()
        }, status=200)


# Ingredient Nutrients

class IngredientNutrientViewSet(CoreModelViewSet):
    queryset = models.IngredientNutrient.all.all()
    filterset_class = filters.IngredientNutrientFilter
    ordering_fields = '__all__'
    serializer_class = serializers.IngredientNutrientSerializer_GET

    def get_queryset(self):
        if ('ingredient_pk' in self.kwargs):
            return self.queryset.filter(ingredient=self.kwargs['ingredient_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.IngredientNutrientSerializer_POST
        return serializers.IngredientNutrientSerializer_GET


class AllIngredientNutrientViewSet(viewsets.ReadOnlyModelViewSet):
    """ Get all active nutrients of ingredient"""
    queryset = models.IngredientNutrient.objects.all().order_by('-nutrient__order')
    pagination_class = AllPagination
    serializer_class = serializers.AllIngredientNutrientSerializer_GET

    def get_queryset(self):
        if ('ingredient_pk' in self.kwargs):
            return self.queryset.filter(ingredient=self.kwargs['ingredient_pk'])
        return self.queryset


class IngredientNutrientHistoryViewSet(HistoryViewSet):
    queryset = models.IngredientNutrient.history.all()
    serializer_class = serializers.IngredientNutrientHistorySerializer


class IngredientNutrientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.IngredientNutrient.all.get(pk=self.id_pk)


class IngredientNutrientExport(GenericExportView):
    queryset = models.IngredientNutrient.all.all()
    filterset_class = filters.IngredientNutrientFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.IngredientNutrientResource().export(qs.qs)


class IngredientNutrientImport(GenericImportView):
    def get_resource(self):
        return admin.IngredientNutrientResource()
