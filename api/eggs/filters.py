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
        }


class EggResourceFilter(CoreFilterSet):
    class Meta:
        model = models.Egg
        fields = {
            'chicken': ['in', 'exact'],
        }
