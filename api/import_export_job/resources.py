from django.contrib import admin
from import_export import resources, fields, widgets

from . import models
from feeds.models import Feed
from weights.models import Weight
from eggs.models import Egg
from hatchery.models import Hatchery
from breeds.models import Breed
from houses.models import House
from pen.models import Pen
from chickens.models import Chicken
from reduction_reason.models import ReductionReason


class BaseChickenResource(resources.ModelResource):
    tag = fields.Field(column_name='tag', attribute='tag')
    hatch_date = fields.Field(column_name='hatch_date', attribute='hatch_date')
    sex = fields.Field(column_name='sex', attribute='sex')
    generation = fields.Field(column_name='generation',
                              attribute='generation', readonly=True)
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(Breed, field='name'))
    hatchery = fields.Field(
        column_name='hatchery',
        attribute='hatchery',
        widget=widgets.ForeignKeyWidget(Hatchery, field='name'))
    house = fields.Field(
        column_name='house',
        attribute='pen__house',
        widget=widgets.ForeignKeyWidget(House, field='name'))
    pen = fields.Field(
        column_name='pen',
        attribute='pen',
        widget=widgets.ForeignKeyWidget(Pen, field='name'))
    sire = fields.Field(
        column_name='sire',
        attribute='sire',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    dam = fields.Field(
        column_name='dam',
        attribute='dam',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))
    reduction_date = fields.Field(
        column_name='reduction_date', attribute='reduction_date')
    reduction_reason = fields.Field(
        column_name='reduction_reason',
        attribute='reduction_reason',
        widget=widgets.ForeignKeyWidget(ReductionReason, field='name'))

    class Meta:
        model = Chicken
        import_id_fields = ['tag']
        exclude = ['id']
        fields = ['tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason']


class ChickenWeightResource(BaseChickenResource):
    pass
