from django.contrib import admin
from import_export import resources
from simple_history.admin import SimpleHistoryAdmin
from import_export import resources, fields, widgets

from . import models
from breeds.models import Breed


class BreedResource(resources.ModelResource):
    class Meta:
        model = models.Breed
        fields = ['id', 'name', 'color']


class BreedWeightGuidelineResource(resources.ModelResource):
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(models.Breed, field='name'))

    class Meta:
        model = models.BreedWeightGuideline
        fields = ['id', 'breed', 'week', 'weight']


class BreedFeedGuidelineResource(resources.ModelResource):
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(models.Breed, field='name'))

    class Meta:
        model = models.BreedFeedGuideline
        fields = ['id', 'breed', 'week', 'weight']


class BreedEggGuidelineResource(resources.ModelResource):
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(models.Breed, field='name'))

    class Meta:
        model = models.BreedEggGuideline
        fields = ['id', 'breed', 'week', 'egg', 'weight']


class BreedHDEPGuidelineResource(resources.ModelResource):
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(models.Breed, field='name'))

    class Meta:
        model = models.BreedHDEPGuideline
        fields = ['id', 'breed', 'week', 'hdep']


class BreedHHEPGuidelineResource(resources.ModelResource):
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(models.Breed, field='name'))

    class Meta:
        model = models.BreedHHEPGuideline
        fields = ['id', 'breed', 'week', 'hhep']


admin.site.register(models.Breed, SimpleHistoryAdmin)
