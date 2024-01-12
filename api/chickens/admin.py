from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin

from . import models


class ChickenResource(resources.ModelResource):
    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex', 'breed']

    def dehydrate_weekly_data(self, chicken):
        return [{'week 1': 1, 'week 2': 2}, {'week 3': 3, 'week 4': 4}]


admin.site.register(models.Chicken, SimpleHistoryAdmin)
