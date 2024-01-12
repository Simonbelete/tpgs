from django.contrib import admin
from import_export import resources, fields, widgets
from simple_history.admin import SimpleHistoryAdmin

from . import models
from feeds.models import Feed


class ChickenResource(resources.ModelResource):
    feeds = fields.Field(
        column_name='feeds',
        attribute='feeds',
        widget=widgets.ManyToManyWidget(Feed, field='week')
    )

    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex', 'breed', 'feeds']


admin.site.register(models.Chicken, SimpleHistoryAdmin)
