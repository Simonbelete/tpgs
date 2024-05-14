from rest_framework.permissions import DjangoModelPermissions

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


class HouseViewSet(CoreModelViewSet):
    queryset = models.House.all.all()
    # permission_classes = [DjangoModelPermissions]
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


class HouseExport(GenericExportView):
    def get_dataset(self):
        return admin.HouseResource().export()


class HouseImport(GenericImportView):
    def get_resource(self):
        return admin.HouseResource()
