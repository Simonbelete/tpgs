from django_filters import rest_framework as filters

from . import models


class HouseFilter(filters.FilterSet):
    class Meta:
        model = models.House
        fields = ['name', 'is_active']
