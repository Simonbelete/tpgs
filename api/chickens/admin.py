from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class ChickenResource(resources.ModelResource):
    class Meta:
        model = models.Chicken
        fields = ['id', 'tag']


admin.site.register(models.Chicken, SimpleHistoryAdmin)
