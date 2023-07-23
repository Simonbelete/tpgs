from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin

from . import models


class WeightResource(resources.ModelResource):
    class Meta:
        model = models.Weight
        fields = ['id', 'name']


admin.site.register(models.Weight, SimpleHistoryAdmin)
