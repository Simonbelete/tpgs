from django_filters import rest_framework as filters

from . import models


class PurposeFilter(filters.FilterSet):
    # name = django_filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Purpose
        fields = ['is_active']
