from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models

class ReductionReasonResource(resources.ModelResource):
    class Meta:
        model = models.ReductionReason
        fields = ['id', 'name']

admin.site.register(models.ReductionReason, SimpleHistoryAdmin)
