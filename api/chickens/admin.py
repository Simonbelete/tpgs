from django.contrib import admin
from import_export import resources, fields, widgets
from simple_history.admin import SimpleHistoryAdmin
import warnings
import tablib
from django.db.models.query import QuerySet

from . import models
from feeds.models import Feed
from weights.models import Weight
from eggs.models import Egg


class ChickenWeightResource(resources.ModelResource):
    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex',
                  'breed', 'generation', 'hatchery', 'pen']

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

        ids = list(zip(*queryset.values_list('id')))[0]
        ids = [] if len(ids) == 0 else ids

        weekly_data = Weight.objects.filter(chicken__in=ids)
        weeks = weekly_data.values_list(
            'week').distinct().order_by('week')
        weeks = list(zip(*weeks))
        weeks = [] if len(weeks) == 0 else weeks

        headers = [*self.get_export_headers(), *weeks]

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


class ChickenEggResource(resources.ModelResource):
    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex',
                  'breed']

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

        headers = [*self.get_export_headers(), *weeks]

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


class ChickenFeedResource(resources.ModelResource):
    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex',
                  'breed']

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

        feeds = Feed.objects.filter(chicken__in=ids)
        weeks = feeds.values_list(
            'week').distinct().order_by('week')
        weeks = list(zip(*weeks))[0] or []

        headers = [*self.get_export_headers(), *weeks]

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


class ChickenResource(resources.ModelResource):
    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex',
                  'breed']


admin.site.register(models.Chicken, SimpleHistoryAdmin)
