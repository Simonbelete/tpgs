from django.contrib import admin
from import_export import resources, fields, widgets
import numpy as np
import pandas as pd
from tablib import Dataset
from django.template.loader import get_template, render_to_string

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


class BaseResource(resources.ModelResource):
    def after_read_file(self, df):
        """ After pd.read_csv"""
        return df


class BaseChickenResource(BaseResource):
    tag = fields.Field(column_name='tag', attribute='tag')
    hatch_date = fields.Field(column_name="hatch_date", attribute="hatch_date",
                              widget=widgets.DateWidget(format="%d/%m/%Y"))
    sex = fields.Field(column_name='sex', attribute='sex')
    generation = fields.Field(column_name='generation',
                              attribute='generation')
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
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason', 'color']


class ChickenWeightResource(BaseChickenResource):
    def after_read_file(self, df):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        self.df_weekly = df.filter(
            regex=(col_filter)).copy(deep=True)
        self.df_weekly['tag'] = df['tag']

        df = df.replace(np.nan, None)
        columns = list(df.filter(regex=col_filter))

        df = df[df.columns.drop(list(df.filter(regex=col_filter)))]

        # Build for weight resource
        self.df_weights = pd.melt(self.df_weekly, id_vars=[
                                  'tag'], value_vars=columns)
        self.df_weights.rename(
            columns={'tag': 'chicken', 'variable': 'week', 'value': 'weight'}, inplace=True)
        self.df_weights['week'] = self.df_weights['week'].str.replace(
            '\D+', '', regex=True)

        return df

    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        resource = WeightResource()
        dataset = Dataset().load(self.df_weights)
        print(dataset)
        result = resource.import_data(dataset, dry_run=dry_run)

        rendered = render_to_string("import_result.html", {'result': result})
        if result.has_errors():
            raise Exception(rendered)


class ChickenFeedResource(BaseChickenResource):
    def after_read_file(self, df):
        col_filter = "((W|w)eek(\s)?)[0-9]+"
        self.df_weekly = df.filter(
            regex=(col_filter)).copy(deep=True)
        self.df_weekly['tag'] = df['tag']

        df = df.replace(np.nan, None)
        columns = list(df.filter(regex=col_filter))

        df = df[df.columns.drop(list(df.filter(regex=col_filter)))]

        # Build for weight resource
        self.df_weights = pd.melt(self.df_weekly, id_vars=[
                                  'tag'], value_vars=columns)
        self.df_weights.rename(
            columns={'tag': 'chicken', 'variable': 'week', 'value': 'weight'}, inplace=True)
        self.df_weights['week'] = self.df_weights['week'].str.replace(
            '\D+', '', regex=True)

        return df

    def after_import(self, dataset, result, using_transactions, dry_run, **kwargs):
        resource = FeedResource()
        dataset = Dataset().load(self.df_weights)
        print(dataset)
        result = resource.import_data(dataset, dry_run=dry_run)

        rendered = render_to_string("import_result.html", {'result': result})
        if result.has_errors():
            raise Exception(rendered)


class WeightResource(BaseResource):
    chicken = fields.Field(
        column_name='chicken',
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))

    class Meta:
        model = Weight
        import_id_fields = ['chicken', 'week']
        fields = ['id', 'chicken', 'week', 'weight']


class FeedResource(BaseResource):
    chicken = fields.Field(
        column_name='chicken',
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))

    class Meta:
        model = Feed
        import_id_fields = ['chicken', 'week']
        fields = ['id', 'chicken', 'week', 'weight']


class EggResource(BaseResource):
    chicken = fields.Field(
        column_name='chicken',
        attribute='chicken',
        widget=widgets.ForeignKeyWidget(Chicken, field='tag'))

    class Meta:
        model = Egg
        import_id_fields = ['chicken', 'week']
        fields = ['id', 'chicken', 'week', 'eggs', 'weight']


class BreedResource(BaseResource):
    class Meta:
        model = Breed
        fields = ['id', 'name', 'color']


class HatcheryResource(BaseResource):
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget(Breed, field='name'))
    hatch_date = fields.Field(column_name="hatch_date", attribute="hatch_date",
                              widget=widgets.DateWidget(format="%d/%m/%Y"))

    class Meta:
        model = Hatchery
        import_id_fields = ['name']
        fields = ['name', 'hatch_date', 'breed']
