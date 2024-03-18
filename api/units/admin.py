from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin
from django.contrib.admin.models import ADDITION, LogEntry


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


class UnitAdmin(admin.ModelAdmin):
    pass


class UnitConverterAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Unit, UnitAdmin)
admin.site.register(models.UnitConverter, UnitConverterAdmin)
admin.site.register(LogEntry)
