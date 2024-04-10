from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class ChickenFilter(CoreFilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='contains')
    reduction_date__isnull = filters.BooleanFilter(
        field_name='reduction_date', lookup_expr='isnull')

    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex', 'breed']
        fields = {
            'tag': ['exact'],
            'sex': ['in', 'exact'],
            'hatch_date': ['in', 'exact'],
            'sire': ['in', 'exact'],
            'dam': ['in', 'exact'],
            'hatchery': ['in', 'exact'],
            'house': ['in', 'exact'],
            'pen': ['in', 'exact'],
            'pen__house': ['in', 'exact'],
            'breed': ['in', 'exact'],
            'reduction_date': ['in', 'exact'],
            'reduction_reason': ['in', 'exact'],
            'color': ['in', 'exact'],
            'generation': ['in', 'exact'] 
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
