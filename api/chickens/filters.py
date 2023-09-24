from django_filters import rest_framework as filters

from . import models

class ChickenFilter(filters.FilterSet):
    tag = filters.CharFilter(field_name='tag', lookup_expr='contains')

    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex', 'is_active']