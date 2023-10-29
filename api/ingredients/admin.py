from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin
from import_export import resources, fields, widgets

from . import models
from nutrients.models import Nutrient

class IngredientTypeResource(resources.ModelResource):
    class Meta:
        model = models.IngredientType
        fields = ['id', 'name']

class IngredientResource(resources.ModelResource):
    class Meta:
        model = models.Ingredient
        fields = ['id', 'code', 'name', 'price', 'dm']

class IngredientNutrientResource(resources.ModelResource):
    ingredient = fields.Field(
        column_name='ingredient',
        attribute='ingredient',
        widget=widgets.ForeignKeyWidget(models.Ingredient, field='name'))
    nutrient = fields.Field(
        column_name='nutrient',
        attribute='nutrient',
        widget=widgets.ForeignKeyWidget(Nutrient, field='abbreviation'))
    class Meta:
        model = models.IngredientNutrient
        fields = ['id', 'ingredient', 'nutrient', 'value']

admin.site.register(models.Ingredient)
admin.site.register(models.IngredientNutrient)
admin.site.register(models.IngredientType)
