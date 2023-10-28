from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models

class RequirementResource(resources.ModelResource):
    class Meta:
        model = models.Requirement
        fields = ['id', 'name', 'weight']

admin.site.register(models.Requirement, SimpleHistoryAdmin)
