from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models

class UnitResource(resources.ModelResource):
    class Meta:
        model = models.Unit
        import_id_fields = ['id']
        fields = ['id', 'name']

class UnitConverterResource(resources.ModelResource):
    class Meta:
        model = models.UnitConverter
        fields = ['id', 'name']

admin.site.register(models.Unit, SimpleHistoryAdmin)
admin.site.register(models.UnitConverter, SimpleHistoryAdmin)
