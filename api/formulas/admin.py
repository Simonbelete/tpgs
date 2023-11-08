from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class FormulaRequirementResource(resources.ModelResource):
    class Meta:
        model = models.FormulaRequirement
        fields = ['id']
