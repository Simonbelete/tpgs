from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class FormulaRequirementResource(resources.ModelResource):
    class Meta:
        model = models.FormulaRequirement
        fields = ['id']


class FormulaRationResource(resources.ModelResource):
    class Meta:
        model = models.FormulaRation
        fields = ['id']


class FormulaIngredientResource(resources.ModelResource):
    class Meta:
        model = models.FormulaIngredient
        fields = ['id']
