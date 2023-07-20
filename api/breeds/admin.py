from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class BreedResource(resources.ModelResource):
    class Meta:
        model = models.Breed
        fields = ['id', 'name', 'color']


admin.site.register(models.Breed, SimpleHistoryAdmin)
