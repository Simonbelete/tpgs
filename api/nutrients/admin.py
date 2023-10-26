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
    id = fields.Field(attribute='id', column_name='ID')
    code = fields.Field(attribute='code', column_name='Code')
    name = fields.Field(attribute='name', column_name='Name')
    abbreviation = fields.Field(
        attribute='abbreviation', column_name='Abbreviation')
    unit = fields.Field(attribute='unit', column_name='Unit',
                        widget=widgets.ForeignKeyWidget(Unit, field='name'))
    nutrient_group = fields.Field(attribute='nutrient_group',
                                  column_name='Nutrient Group', widget=widgets.ForeignKeyWidget(models.NutrientGroup, field='name'))
    description = fields.Field(
        attribute='description', column_name='Description')

    class Meta:
        model = models.Nutrient
        skip_unchanged = True
        report_skipped = True
        import_id_fields = ['id']


admin.site.register(models.Nutrient, SimpleHistoryAdmin)
admin.site.register(models.NutrientGroup, SimpleHistoryAdmin)
