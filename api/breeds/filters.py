from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class BreedFilter(CoreFilterSet):
    pass


class BreedHDEPGuidelineFilter(CoreFilterSet):
    start_week = filters.NumberFilter(field_name='week', lookup_expr='gte')
    end_week = filters.NumberFilter(field_name='week', lookup_expr='lte')

    class Meta:
        model = models.BreedHDEPGuideline
        fields = {
            'breed': ['in', 'exact'],
        }


class BreedHHEPGuidelineFilter(CoreFilterSet):
    start_week = filters.NumberFilter(field_name='week', lookup_expr='gte')
    end_week = filters.NumberFilter(field_name='week', lookup_expr='lte')

    class Meta:
        model = models.BreedHHEPGuideline
        fields = {
            'breed': ['in', 'exact']
        }


class BreedWeightGuidelineFilter(CoreFilterSet):
    start_week = filters.NumberFilter(field_name='week', lookup_expr='gte')
    end_week = filters.NumberFilter(field_name='week', lookup_expr='lte')

    class Meta:
        model = models.BreedWeightGuideline
        fields = {
            'breed': ['in', 'exact']
        }


class BreedEggGuidelineFilter(CoreFilterSet):
    start_week = filters.NumberFilter(field_name='week', lookup_expr='gte')
    end_week = filters.NumberFilter(field_name='week', lookup_expr='lte')

    class Meta:
        model = models.BreedEggGuideline
        fields = {
            'breed': ['in', 'exact']
        }


class BreedFeedGuidelineFilter(CoreFilterSet):
    start_week = filters.NumberFilter(field_name='week', lookup_expr='gte')
    end_week = filters.NumberFilter(field_name='week', lookup_expr='lte')

    class Meta:
        model = models.BreedFeedGuideline
        fields = {
            'breed': ['in', 'exact']
        }
