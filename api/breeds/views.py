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

# Breed


class BreedViewSet(CoreModelViewSet):
    queryset = models.Breed.objects.all()
    serializer_class = serializers.BreedSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedSerializer_POST
        return serializers.BreedSerializer_GET


class BreedHistoryViewSet(HistoryViewSet):
    queryset = models.Breed.history.all()
    serializer_class = serializers.BreedHistorySerializer


class BreedSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Breed.all.get(pk=self.id_pk)


class BreedExport(GenericExportView):
    def get_dataset(self):
        return admin.BreedResource().export()


class BreedImport(GenericImportView):
    def get_resource(self):
        return admin.BreedResource()


# Breed Weight Guide

class BreedWeightGuidelineViewSet(CoreModelViewSet):
    queryset = models.BreedWeightGuideline.all.all()
    serializer_class = serializers.BreedWeightGuidelineSerializer_GET

    def get_queryset(self):
        if ('breed_pk' in self.kwargs):
            return self.queryset.filter(breed=self.kwargs['breed_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedWeightGuidelineSerializer_POST
        return serializers.BreedWeightGuidelineSerializer_GET


class BreedWeightGuidelineExport(GenericExportView):
    def get_dataset(self):
        return admin.BreedWeightGuidelineResource().export()


class BreedWeightGuidelineImport(GenericImportView):
    def get_resource(self):
        return admin.BreedWeightGuidelineResource()


class BreedWeightGuidelineHistoryViewSet(HistoryViewSet):
    queryset = models.BreedWeightGuideline.history.all()
    serializer_class = serializers.BreedWeightGuidelineHistorySerializer


class BreedWeightGuidelineSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.BreedWeightGuideline.all.get(pk=self.id_pk)


# Breed Egg Guide

class BreedEggGuidelineViewSet(CoreModelViewSet):
    queryset = models.BreedEggGuideline.all.all()
    serializer_class = serializers.BreedEggGuidelineSerializer_GET

    def get_queryset(self):
        if ('breed_pk' in self.kwargs):
            return self.queryset.filter(breed=self.kwargs['breed_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedEggGuideSerializer_POST
        return serializers.BreedEggGuidelineSerializer_GET


class BreedEggGuidelineExport(GenericExportView):
    def get_dataset(self):
        return admin.BreedEggGuidelineResource().export()


class BreedEggGuidelineImport(GenericImportView):
    def get_resource(self):
        return admin.BreedEggGuidelineResource()


class BreedEggGuidelineHistoryViewSet(HistoryViewSet):
    queryset = models.BreedEggGuideline.history.all()
    serializer_class = serializers.BreedEggGuidelineHistorySerializer


class BreedEggGuidelineSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.BreedEggGuideline.all.get(pk=self.id_pk)


# Breed Feed Guideline

class BreedFeedGuidelineViewSet(CoreModelViewSet):
    queryset = models.BreedFeedGuideline.all.all()
    serializer_class = serializers.BreedFeedGuidelineSerializer_GET

    def get_queryset(self):
        if ('breed_pk' in self.kwargs):
            return self.queryset.filter(breed=self.kwargs['breed_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedFeedGuideSerializer_POST
        return serializers.BreedFeedGuidelineSerializer_GET


class BreedFeedGuidelineExport(GenericExportView):
    def get_dataset(self):
        return admin.BreedFeedGuidelineResource().export()


class BreedFeedGuidelineImport(GenericImportView):
    def get_resource(self):
        return admin.BreedFeedGuidelineResource()


class BreedFeedGuidelineHistoryViewSet(HistoryViewSet):
    queryset = models.BreedFeedGuideline.history.all()
    serializer_class = serializers.BreedFeedGuidelineHistorySerializer


class BreedFeedGuidelineSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.BreedFeedGuideline.all.get(pk=self.id_pk)


# Breed HDEP Guid

class BreedHDEPGuidelineViewSet(CoreModelViewSet):
    queryset = models.BreedHDEPGuideline.all.all()
    serializer_class = serializers.BreedHDEPGuidelineSerializer_GET

    def get_queryset(self):
        if ('breed_pk' in self.kwargs):
            return self.queryset.filter(breed=self.kwargs['breed_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedHDEPGuidelineSerializer_POST
        return serializers.BreedHDEPGuidelineSerializer_GET


class BreedHDEPGuidelineExport(GenericExportView):
    def get_dataset(self):
        return admin.BreedHDEPGuidelineResource().export()


class BreedHDEPGuidelineImport(GenericImportView):
    def get_resource(self):
        return admin.BreedHDEPGuidelineResource()


class BreedHDEPGuidelineHistoryViewSet(HistoryViewSet):
    queryset = models.BreedHDEPGuideline.history.all()
    serializer_class = serializers.BreedHDEPGuidelineHistorySerializer


class BreedHDEPGuidelineSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.BreedHDEPGuideline.all.get(pk=self.id_pk)


# Breed HHEP Guideline

class BreedHHEPGuidelineViewSet(CoreModelViewSet):
    queryset = models.BreedHHEPGuideline.all.all()
    serializer_class = serializers.BreedHHEPGuidelineSerializer_GET

    def get_queryset(self):
        if ('breed_pk' in self.kwargs):
            return self.queryset.filter(breed=self.kwargs['breed_pk'])
        return self.queryset

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.BreedHHEPGuidelineSerializer_POST
        return serializers.BreedHHEPGuidelineSerializer_GET


class BreedHHEPGuidelineExport(GenericExportView):
    def get_dataset(self):
        return admin.BreedHHEPGuidelineResource().export()


class BreedHHEPGuidelineImport(GenericImportView):
    def get_resource(self):
        return admin.BreedHHEPGuidelineResource()


class BreedHHEPGuidelineHistoryViewSet(HistoryViewSet):
    queryset = models.BreedHHEPGuideline.history.all()
    serializer_class = serializers.BreedHHEPGuidelineHistorySerializer


class BreedHHEPGuidelineSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.BreedHHEPGuideline.all.get(pk=self.id_pk)
