from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class BreedResource(resources.ModelResource):
    class Meta:
        model = models.Breed
        fields = ['id', 'name', 'color']

class BreedWeightGuideResource(resources.ModelResource):
    class Meta:
        model = models.BreedWeightGuide
        fields = ['id', 'breed', 'week']

class BreedFeedGuideResource(resources.ModelResource):
    class Meta:
        model = models.BreedFeedGuide
        fields = ['id', 'breed', 'week']
        
class BreedEggGuideResource(resources.ModelResource):
    class Meta:
        model = models.BreedEggGuide
        fields = ['id', 'breed', 'week']

admin.site.register(models.Breed, SimpleHistoryAdmin)
