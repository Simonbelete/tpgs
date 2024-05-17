from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class ChickenRankingFilter(filters.FilterSet):

    class Meta:
        model = models.ChickenRanking
        fields = {
            'chicken': ['in', 'exact'],
            'chicken__hatchery': ['in', 'exact']
        }


class ChickenRecordSetFilter(filters.FilterSet):

    class Meta:
        model = models.ChickenRecordset
        fields = {
            'week': ['exact'],
            'chicken': ['in', 'exact'],
            'chicken__breed': ['in', 'exact'],
            'chicken__house': ['in', 'exact'],
            'chicken__generation': ['in', 'exact'],
            'chicken__pen': ['in', 'exact'],
            'chicken__hatchery': ['in', 'exact'],
            'chicken__sex': ['in', 'exact'],
            'chicken__hatch_date': ['in', 'exact'],
            'chicken__reduction_date': ['in', 'exact'],
            'chicken__reduction_reason': ['in', 'exact'],
            'chicken__color': ['in', 'exact']
        }
