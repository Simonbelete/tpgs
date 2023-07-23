from django.contrib import admin
from import_export import resources
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin

from . import models


class FeedResource(resources.ModelResource):
    class Meta:
        model = models.Feed
        fields = ['id']


admin.site.register(models.Feed, SimpleHistoryAdmin)
