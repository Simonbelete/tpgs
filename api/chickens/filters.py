from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class ChickenFilter(CoreFilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='contains')

    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex']


class ChickenResourceFilter(CoreFilterSet):
    class Meta:
        models = models.Chicken
        field = {
            'chicken': ['in', 'exact'],
            'hatchery': ['exact'],
            'house': ['exact'],
            'pen': ['exact'],
            'generation': ['exact']
        }
