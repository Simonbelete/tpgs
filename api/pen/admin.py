from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models

class PenResource(resources.ModelResource):
    class Meta:
        model = models.Pen
        fields = ['id', 'name', 'house']

admin.site.register(models.Pen, SimpleHistoryAdmin)
