from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models

class EggFilter(CoreFilterSet):
    flock__isnull = filters.BooleanFilter(field_name='flock', lookup_expr='isnull')
    chicken__isnull = filters.BooleanFilter(field_name='chicken', lookup_expr='isnull')

    class Meta:
        model = models.Egg
        fields = ['chicken', 'flock', 'flock__isnull', 'chicken__isnull']