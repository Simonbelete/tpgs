from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class EggFilter(CoreFilterSet):
    chicken__isnull = filters.BooleanFilter(
        field_name='chicken', lookup_expr='isnull')

    class Meta:
        model = models.Egg
        fields = {
            'chicken': ['in', 'exact'],
            'created_by': ['in', 'exact'],
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


class EggResourceFilter(CoreFilterSet):
    class Meta:
        model = models.Egg
        fields = {
            'chicken': ['in', 'exact'],
        }
