from django.contrib import admin
from import_export import resources, fields, widgets
from simple_history.admin import SimpleHistoryAdmin

from . import models
from units.models import Unit


class NutrientGroupResource(resources.ModelResource):
    class Meta:
        model = models.NutrientGroup
        fields = ['id', 'name']


class NutrientResource(resources.ModelResource):
    unit = fields.Field(
        column_name='unit',
        attribute='unit',
        widget=widgets.ForeignKeyWidget(Unit, field='name'))
    unit = fields.Field(
        column_name='nutrient_group',
        attribute='nutrient_group',
        widget=widgets.ForeignKeyWidget(models.NutrientGroup, field='name'))

    class Meta:
        model = models.Nutrient
        skip_unchanged = True
        report_skipped = True
        import_id_fields = ['id']
        fields=['id', 'name', 'abbreviation', 'unit', 'code', 'nutrient_group', 'description']


admin.site.register(models.Nutrient, SimpleHistoryAdmin)
admin.site.register(models.NutrientGroup, SimpleHistoryAdmin)
