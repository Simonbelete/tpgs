from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin

from . import models

class IngredientTypeResource(resources.ModelResource):
    class Meta:
        model = models.IngredientType
        fields = ['id', 'name']

class IngredientResource(resources.ModelResource):
    class Meta:
        model = models.Ingredient
        fields = ['id', 'code', 'name']

admin.site.register(models.Ingredient)
admin.site.register(models.IngredientNutrient)
admin.site.register(models.IngredientType)
