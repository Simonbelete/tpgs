from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class ChickenFilter(CoreFilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='contains')

    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex', 'breed']
        fields = {
            'tag': ['exact'],
            'sex': ['exact'],
            'pen': ['in', 'exact'],
            'pen__house': ['in', 'exact'],
            'hatchery': ['in', 'exact']
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
