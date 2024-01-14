from django.contrib import admin
from import_export import resources, fields, widgets
from simple_history.admin import SimpleHistoryAdmin
import warnings
import tablib
from django.db.models.query import QuerySet

from . import models
from feeds.models import Feed


class ChickenResource(resources.ModelResource):
    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'hatch_date', 'sex',
                  'breed']

    def export_resource(self, obj):
        for f in self.get_export_fields():
            print(self.export_field(f, obj))
        return [self.export_field(field, obj) for field in self.get_export_fields()]

    def export_resource_dict(self, obj):
        result = {}
        for field in self.get_export_fields():
            result[field.column_name] = self.export_field(field, obj)
        return result

    def export(self, *args, queryset=None, **kwargs):
        if len(args) == 1 and (
            isinstance(args[0], QuerySet) or isinstance(args[0], list)
        ):
            # issue 1565: definition of export() was incorrect
            # if queryset is being passed, it must be as the first arg or named
            # parameter
            # this logic is included for backwards compatibility:
            # if the method is being called without a named parameter, add a warning
            # this check should be removed in a future release
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


admin.site.register(models.Chicken, SimpleHistoryAdmin)
