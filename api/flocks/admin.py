from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin

from . import models


class FlockResource(resources.ModelResource):
    class Meta:
        model = models.Flock


admin.site.register(models.Flock, SimpleHistoryAdmin)
