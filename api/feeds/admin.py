from django.contrib import admin
from import_export import resources
from import_export.fields import Field
from django_tenants.admin import TenantAdminMixin
from simple_history.admin import SimpleHistoryAdmin

from . import models


class FeedResource(resources.ModelResource):
    chicken__tag = Field(attribute='chicken__tag', column_name='tag')

    class Meta:
        model = models.Feed
        fields = ['id', 'chicken__tag', 'week', 'weight']


admin.site.register(models.Feed, SimpleHistoryAdmin)
