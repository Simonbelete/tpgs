from django.contrib import admin
from import_export import resources, fields, widgets
from simple_history.admin import SimpleHistoryAdmin
import warnings
import tablib
from django.db.models.query import QuerySet
from django.db.models import Q

from . import models
from feeds.models import Feed
from weights.models import Weight
from eggs.models import Egg


class BaseChickenResource(resources.ModelResource):
    id = fields.Field(column_name='id', attribute='id')
    tag = fields.Field(column_name='tag', attribute='tag')
    hatch_date = fields.Field(column_name='hatch_date', attribute='hatch_date')
    sex = fields.Field(column_name='sex', attribute='sex')
    generation = fields.Field(column_name='generation', attribute='generation')
    breed = fields.Field(
        column_name='breed',
        attribute='breed',
        widget=widgets.ForeignKeyWidget('breeds.Breed', field='name'))
    hatchery = fields.Field(
        column_name='hatchery',
        attribute='hatchery',
        widget=widgets.ForeignKeyWidget('hatchery.Hatchery', field='name'))
    house = fields.Field(
        column_name='house',
        attribute='pen__house',
        widget=widgets.ForeignKeyWidget('houses.House', field='name'))
    pen = fields.Field(
        column_name='pen',
        attribute='pen',
        widget=widgets.ForeignKeyWidget('pen.Pen', field='name'))
    sire = fields.Field(
        column_name='sire',
        attribute='sire',
        widget=widgets.ForeignKeyWidget('chickens.Chicken', field='tag'))
    dam = fields.Field(
        column_name='dam',
        attribute='dam',
        widget=widgets.ForeignKeyWidget('chickens.Chicken', field='tag'))
    reduction_date = fields.Field(
        column_name='reduction_date', attribute='reduction_date')
    reduction_reason = fields.Field(
        column_name='reduction_reason',
        attribute='reduction_reason',
        widget=widgets.ForeignKeyWidget('reduction_reason.ReductionReason', field='name'))

    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen', 'sire', 'dam', 'reduction_date', 'reduction_reason']


class ChickenWeightResource(BaseChickenResource):
    def export(self, *args, queryset=None, **kwargs):
        if len(args) == 1 and (
            isinstance(args[0], QuerySet) or isinstance(args[0], list)
        ):
            warnings.warn(
                "'queryset' must be supplied as a named parameter",
                category=DeprecationWarning,
            )
            queryset = args[0]

        self.before_export(queryset, *args, **kwargs)

        if queryset is None:
            queryset = self.get_queryset()
        queryset = self.filter_export(queryset, *args, **kwargs)

        ids = list(zip(*queryset.values_list('id')))
        ids = [] if len(ids) == 0 else ids[0]

        weekly_data = Weight.objects.filter(chicken__in=ids)
        weeks = weekly_data.values_list(
            'week').distinct().order_by('week')
        weeks = list(zip(*weeks))
        weeks = [] if len(weeks) == 0 else weeks[0]

        week_header = ["Week {week}".format(week=w) for w in weeks]

        headers = [*self.get_export_headers(), *week_header]

        data = tablib.Dataset(headers=headers)

        for obj in self.iter_queryset(queryset):
            row = self.export_resource(obj)
            for week in weeks:
                week_data = weekly_data.filter(
                    chicken=obj.id, week=week).first()
                if (week_data):
                    row.append(week_data.weight)
                else:
                    row.append('-')
            data.append(row)

        self.after_export(queryset, data, *args, **kwargs)

        return data

    def after_import_row(self, row, row_result, row_number=None, **kwargs):
        print('------------------')
        print(row)
        return super().after_import_row(row, row_result, row_number, **kwargs)


class ChickenEggResource(BaseChickenResource):
    def export(self, *args, queryset=None, **kwargs):
        if len(args) == 1 and (
            isinstance(args[0], QuerySet) or isinstance(args[0], list)
        ):
            warnings.warn(
                "'queryset' must be supplied as a named parameter",
                category=DeprecationWarning,
            )
            queryset = args[0]

        self.before_export(queryset, *args, **kwargs)

        if queryset is None:
            queryset = self.get_queryset()
        queryset = self.filter_export(queryset, *args, **kwargs)

        ids = list(zip(*queryset.values_list('id')))[0] or []

        weekly_data = Egg.objects.filter(chicken__in=ids)
        weeks = weekly_data.values_list(
            'week').distinct().order_by('week')
        weeks = list(zip(*weeks))[0] or []

        # Number of Egg & Eggs weight
        week_header = []
        for w in weeks:
            week_header.append("Week {week}".format(week=w))
            week_header.append("-")

        headers = [*self.get_export_headers(), *week_header]

        data = tablib.Dataset(headers=headers)

        for obj in self.iter_queryset(queryset):
            row = self.export_resource(obj)
            for week in weeks:
                week_data = weekly_data.filter(
                    chicken=obj.id, week=week).first()
                if (week_data):
                    row.append(week_data.eggs)
                    row.append(week_data.weight)
                else:
                    row.append('-')
                    row.append('-')
            data.append(row)

        self.after_export(queryset, data, *args, **kwargs)

        return data


class ChickenFeedResource(BaseChickenResource):
    def export(self, *args, queryset=None, **kwargs):
        if len(args) == 1 and (
            isinstance(args[0], QuerySet) or isinstance(args[0], list)
        ):
            warnings.warn(
                "'queryset' must be supplied as a named parameter",
                category=DeprecationWarning,
            )
            queryset = args[0]

        self.before_export(queryset, *args, **kwargs)

        if queryset is None:
            queryset = self.get_queryset()
        queryset = self.filter_export(queryset, *args, **kwargs)

        ids = list(zip(*queryset.values_list('id')))[0] or []

        feeds = Feed.objects.filter(chicken__in=ids, chicken__isnull=False)
        weeks = feeds.values_list(
            'week').distinct().order_by('week')
        weeks = list(zip(*weeks))[0] or []

        week_header = ["Week {week}".format(week=w) for w in weeks]

        headers = [*self.get_export_headers(), *week_header]

        data = tablib.Dataset(headers=headers)

        for obj in self.iter_queryset(queryset):
            row = self.export_resource(obj)
            for week in weeks:
                week_feed = feeds.filter(chicken=obj.id, week=week).first()
                if (week_feed):
                    row.append(week_feed.weight)
                else:
                    row.append('-')
            data.append(row)

        self.after_export(queryset, data, *args, **kwargs)

        return data


class ChickenResource(BaseChickenResource):
    pass


admin.site.register(models.Chicken, SimpleHistoryAdmin)
