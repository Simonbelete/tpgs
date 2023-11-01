from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin
from import_export import resources, fields, widgets

from . import models
from nutrients.models import Nutrient

class HatcheryResource(resources.ModelResource):
    class Meta:
        model = models.Hatchery
        fields = ['id','name']

class IncubationResource(resources.ModelResource):
    class Meta:
        model = models.Incubation
        fields = ['id','name']

class HatcheryEggsResource(resources.ModelResource):
    hatchery = fields.Field(
        column_name='hatchery',
        attribute='hatchery',
        widget=widgets.ForeignKeyWidget(models.Hatchery, field='name'))
    class Meta:
        model = models.HatcheryEgg
        fields = ['id','name', 'hatchery']