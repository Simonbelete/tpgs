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

class BreedFeedGuideResource(resources.ModelResource):
    class Meta:
        model = models.BreedFeedGuideline
        fields = ['id', 'breed', 'week']
        
class BreedEggGuideResource(resources.ModelResource):
    class Meta:
        model = models.BreedEggGuideline
        fields = ['id', 'breed', 'week']

admin.site.register(models.Breed, SimpleHistoryAdmin)
