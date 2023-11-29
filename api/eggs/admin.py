from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin
from import_export import resources, fields, widgets

from . import models


class EggResource(resources.ModelResource):
    chicken = fields.Field(
        column_name='tag',
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(models.Chicken, field='tag'))

    class Meta:
        model = models.Egg
        fields = ['id', 'week', 'eggs', 'weight', 'chicken']


admin.site.register(models.Egg, SimpleHistoryAdmin)
