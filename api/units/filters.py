from django_filters import rest_framework as filters

from . import models

class UnitFilter(filters.FilterSet):
    class Meta:
        model = models.Unit
        fields = ['is_active']

class UnitConverterFilter(filters.FilterSet):
    class Meta:
        model = models.UnitConverter
        fields = ['is_active']