from django_filters import rest_framework as filters

from . import models


class PenFilter(filters.FilterSet):
    class Meta:
        model = models.Pen
        fields = ['is_active']
