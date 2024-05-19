from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class ChickenFilter(CoreFilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='contains')
    reduction_date__isnull = filters.BooleanFilter(
        field_name='reduction_date', lookup_expr='isnull')

    class Meta:
        model = models.Chicken
        fields = {
            'tag': ['exact'],
            'sex': ['in', 'exact', 'isnull'],
            'hatch_date': ['in', 'exact', 'isnull'],
            'sire': ['in', 'exact', 'isnull'],
            'dam': ['in', 'exact', 'isnull'],
            'hatchery': ['in', 'exact', 'isnull'],
            'house': ['in', 'exact', 'isnull'],
            'pen': ['in', 'exact', 'isnull'],
            'pen__house': ['in', 'exact'],
            'breed': ['in', 'exact', 'isnull'],
            'reduction_date': ['in', 'exact', 'isnull'],
            'reduction_reason': ['in', 'exact', 'isnull'],
            'color': ['in', 'exact', 'isnull'],
            'generation': ['in', 'exact', 'isnull'] 
        }


class ChickenExportFilter(CoreFilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='contains')
    house = filters.NumberFilter(field_name='pen__house', lookup_expr='exact')

    class Meta:
        model = models.Chicken
        fields = {
            'id': ['exact', 'in'],
            'sex': ['exact'],
            'pen': ['in', 'exact'],
            'pen__house': ['in', 'exact'],
            'hatchery': ['in', 'exact']
        }
