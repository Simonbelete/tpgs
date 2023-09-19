from django_filters import rest_framework as filters

from . import models


class HouseFilter(filters.FilterSet):
    is_active = filters.CharFilter(
        field_name='is_active')

    class Meta:
        model = models.House
        fields = ['is_active']
