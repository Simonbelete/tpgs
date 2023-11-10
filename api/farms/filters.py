from django_filters import rest_framework as filters

from . import models


class FarmFilter(filters.FilterSet):
    name__not = filters.CharFilter(field_name='name', exclude=True)

    class Meta:
        model = models.Farm
        fields = ['name', 'tenant_name']
