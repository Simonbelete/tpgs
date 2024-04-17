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
        fields = {
            'chicken': ['in', 'exact'],
            'created_by': ['in', 'exact'],
            'parent': ['exact'],
            'hatchery': ['exact'],
            'chicken__breed': ['in', 'exact'],
            'chicken__house': ['in', 'exact'],
            'chicken__generation': ['in', 'exact'],
            'chicken__pen': ['in', 'exact'],
            'chicken__hatchery': ['in', 'exact'],
            'chicken__sex': ['in', 'exact'],
            'chicken__hatch_date': ['in', 'exact'],
            'chicken__reduction_date': ['in', 'exact'],
            'chicken__reduction_reason': ['in', 'exact'],
            'chicken__color': ['in', 'exact']
        }


class FeedResourceFilter(CoreFilterSet):
    parent__isnull = filters.BooleanFilter(
        field_name='parent', lookup_expr='isnull')

    class Meta:
        model = models.Feed
        fields = ['chicken', 'chicken__hatchery',
                  'chicken__pen', 'chicken__pen__house']
