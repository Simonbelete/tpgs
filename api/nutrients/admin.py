from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class NutrientGroupResource(resources.ModelResource):
    class Meta:
        model = models.NutrientGroup
        fields = ['id', 'name']


class NutrientResource(resources.ModelResource):
    class Meta:
        model = models.Nutrient
        fields = ['id', 'code', 'name', 'abbreviation',
                  'unit__name', 'nutrient_group__name', 'description']


admin.site.register(models.Nutrient, SimpleHistoryAdmin)
admin.site.register(models.NutrientGroup, SimpleHistoryAdmin)
