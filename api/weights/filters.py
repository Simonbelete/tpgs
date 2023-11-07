from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class WeightFilter(CoreFilterSet):
    chicken__isnull = filters.BooleanFilter(
        field_name='chicken', lookup_expr='isnull')

    class Meta:
        model = models.Weight
        fields = ['chicken', 'chicken__isnull']
