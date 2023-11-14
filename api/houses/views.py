from rest_framework.permissions import DjangoModelPermissions

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
    permission_classes = [DjangoModelPermissions]
    serializer_class = serializers.HouseSerializer_GET
    filterset_class = filters.HouseFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.HouseSerializer_GET
        return serializers.HouseSerializer_POST


class HouseHistoryViewSet(HistoryViewSet):
    queryset = models.House.history.all()
    serializer_class = serializers.HouseHistorySerializer


class HouseSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.House.all.get(pk=self.id_pk)

# House Export


class HouseXlsxExport(XlsxExport):
    def get_dataset(self):
        return admin.HouseResource().export()


class HouseXlsExport(XlsExport):
    def get_dataset(self):
        return admin.HouseResource().export()


class HouseCsvExport(CsvExport):
    def get_dataset(self):
        return admin.HouseResource().export()

# House Import


class HouseXlsxImport(XlsxImport):
    def get_resource(self):
        return admin.HouseResource()


class HouseXlsImport(XlsImport):
    def get_resource(self):
        return admin.HouseResource()


class HouseCsvImport(CsvImport):
    def get_resource(self):
        return admin.HouseResource()
