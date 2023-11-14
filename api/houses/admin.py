from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class HouseResource(resources.ModelResource):
    class Meta:
        model = models.House
        skip_unchanged = True
        report_skipped = True
        import_id_fields = ['id']
        fields = ['id', 'name']


admin.site.register(models.House, SimpleHistoryAdmin)
