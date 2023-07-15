from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class NutrientGroupResource(resources.ModelResource):
    class Meta:
        model = models.NutrientGroup
        fields = ['id', 'name']


admin.site.register(models.Nutrient)
admin.site.register(models.NutrientGroup, SimpleHistoryAdmin)
