from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class BreedResource(resources.ModelResource):
    class Meta:
        model = models.Breed
        fields = ['id', 'name', 'color']


class BreedWeightGuidelineResource(resources.ModelResource):
    class Meta:
        model = models.BreedWeightGuideline
        fields = ['id', 'breed', 'week']


class BreedFeedGuidelineResource(resources.ModelResource):
    class Meta:
        model = models.BreedFeedGuideline
        fields = ['id', 'breed', 'week']


class BreedEggGuidelineResource(resources.ModelResource):
    class Meta:
        model = models.BreedEggGuideline
        fields = ['id', 'breed', 'week']


class BreedHDEPGuidelineResource(resources.ModelResource):
    class Meta:
        model = models.BreedHDEPGuideline
        fields = ['id', 'breed', 'week']


class BreedHHEPGuidelineResource(resources.ModelResource):
    class Meta:
        model = models.BreedHHEPGuideline
        fields = ['id', 'breed', 'week']


admin.site.register(models.Breed, SimpleHistoryAdmin)
