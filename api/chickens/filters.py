from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models

class ChickenFilter(CoreFilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='contains')

    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex']