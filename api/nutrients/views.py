from rest_framework.permissions import DjangoModelPermissions
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

# Nutrient Group


class NutrientGroupViewSet(CoreModelViewSet):
    # permission_classes = [DjangoModelPermissions]
    queryset = models.NutrientGroup.all.all()
    serializer_class = serializers.NutrientGroupSerializer_GET
    filterset_class = filters.NutrientGroupFilter
    search_fields = ['name']
    ordering_fields = '__all__'


class NutrientGroupHistoryViewSet(HistoryViewSet):
    queryset = models.NutrientGroup.history.all()
    serializer_class = serializers.NutrientGroupHistorySerializer


class NutrientGroupSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.NutrientGroup.all.get(pk=self.id_pk)


class NutrientGroupExport(GenericExportView):
    def get_dataset(self):
        return admin.NutrientGroupResource().export()


class NutrientGroupImport(GenericImportView):
    def get_resource(self):
        return admin.NutrientGroupResource()


# Nutrient
class NutrientViewSet(CoreModelViewSet):
    queryset = models.Nutrient.all.all()
    # permission_classes = [DjangoModelPermissions]
    serializer_class = serializers.NutrientSerializer_GET
    filterset_class = filters.NutrientFilter
    search_fields = ['code', 'name', 'abbreviation']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.NutrientSerializer_GET
        return serializers.NutrientSerializer_POST


class NutrientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Nutrient.all.get(pk=self.id_pk)


class NutrientHistoryViewSet(HistoryViewSet):
    queryset = models.Nutrient.history.all()
    serializer_class = serializers.NutrientHistorySerializer


class NutrientSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Nutrient.all.get(pk=self.id_pk)


class NutrientExport(GenericExportView):
    def get_dataset(self):
        return admin.NutrientResource().export()


class NutrientImport(GenericImportView):
    def get_resource(self):
        return admin.NutrientResource()


# Get compacted all values

class AllNutrientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Nutrient.objects.all().order_by('order')
    pagination_class = AllPagination
    serializer_class = serializers.AllNutrientSerializer_GET
