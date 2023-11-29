from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin

from . import models


class EggResource(resources.ModelResource):
    class Meta:
        model = models.Egg
        fields = ['id', 'week', 'eggs', 'weight']


admin.site.register(models.Egg, SimpleHistoryAdmin)
