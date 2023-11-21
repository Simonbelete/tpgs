from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class FeedFilter(CoreFilterSet):
    hatchery__isnull = filters.BooleanFilter(
        field_name='hatchery', lookup_expr='isnull')
    chicken__isnull = filters.BooleanFilter(
        field_name='chicken', lookup_expr='isnull')

    class Meta:
        model = models.Feed
        fields = ['chicken', 'parent', 'hatchery',
                  'hatchery__isnull', 'chicken__isnull']


class FeedResourceFilter(CoreFilterSet):
    parent__isnull = filters.BooleanFilter(
        field_name='parent', lookup_expr='isnull')

    class Meta:
        model = models.Feed
        fields = ['chicken', 'chicken__hatchery',
                  'chicken__pen', 'chicken__pen__house']
