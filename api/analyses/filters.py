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
