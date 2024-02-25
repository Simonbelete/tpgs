from django.contrib import admin
from import_export import resources, fields, widgets
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin

from . import models
from chickens.models import Chicken


class WeightResource(resources.ModelResource):
    chicken = fields.Field(
        column_name='chicken',
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))

    class Meta:
        model = models.Weight
        import_id_fields = ['chicken', 'week']
        fields = ['id', 'chicken', 'week', 'weight']


admin.site.register(models.Weight, SimpleHistoryAdmin)
