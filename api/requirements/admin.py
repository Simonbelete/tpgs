from django.contrib import admin
from import_export import resources, fields, widgets
from simple_history.admin import SimpleHistoryAdmin

from . import models
from nutrients.models import Nutrient


class RequirementResource(resources.ModelResource):
    class Meta:
        model = models.Requirement
        fields = ['id', 'name', 'weight', 'desired_dm']


class RequirementNutrientResource(resources.ModelResource):
    requirement = fields.Field(
        column_name='requirement',
        attribute='requirement',
        widget=widgets.ForeignKeyWidget(models.Requirement, field='name'))
    nutrient = fields.Field(
        column_name='nutrient',
        attribute='nutrient',
        widget=widgets.ForeignKeyWidget(Nutrient, field='abbreviation'))

    class Meta:
        model = models.RequirementNutrient
        fields = ['id', 'nutrient', 'requirement', 'value']


admin.site.register(models.Requirement, SimpleHistoryAdmin)
