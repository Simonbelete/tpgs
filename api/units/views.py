from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    GenericExportView,
    GenericImportView
)
from . import models
from . import serializers
from . import filters
from . import admin


# Unit Converter

class UnitConverterViewSet(CoreModelViewSet):
    queryset = models.UnitConverter.all.all()
    serializer_class = serializers.UnitConverterSerializer_GET
    filterset_class = filters.UnitConverterFilter
    search_fields = ['name']
    ordering_fields = '__all__'


class UnitConverterHistoryViewSet(HistoryViewSet):
    queryset = models.UnitConverter.history.all()
    serializer_class = serializers.UnitHistorySerializer


class UnitConverterSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.UnitConverter.all.get(pk=self.id_pk)


class UnitConverterExport(GenericExportView):
    def get_dataset(self):
        return admin.UnitConverterResource().export()


class UnitConverterImport(GenericImportView):
    def get_resource(self):
        return admin.UnitConverterResource()


# Unit

class UnitViewSet(CoreModelViewSet):
    queryset = models.Unit.all.all()
    serializer_class = serializers.UnitSerializer_GET
    filterset_class = filters.UnitFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.UnitSerializer_POST
        return serializers.UnitSerializer_GET


class UnitHistoryViewSet(HistoryViewSet):
    queryset = models.Unit.history.all()
    serializer_class = serializers.UnitHistorySerializer


class UnitSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Unit.all.get(pk=self.id_pk)


class UnitExport(GenericExportView):
    def get_dataset(self):
        return admin.UnitResource().export()


class UnitImport(GenericImportView):
    def get_resource(self):
        return admin.UnitResource()
