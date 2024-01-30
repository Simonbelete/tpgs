from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class BreedFilter(CoreFilterSet):
    pass


class BreedHDEPGuidelineFilter(CoreFilterSet):
    class Meta:
        model = models.BreedHDEPGuideline
        fields = {
            'breed': ['in', 'exact']
        }


class BreedHHEPGuidelineFilter(CoreFilterSet):
    class Meta:
        model = models.BreedHHEPGuideline
        fields = {
            'breed': ['in', 'exact']
        }


class BreedWeightGuidelineFilter(CoreFilterSet):
    class Meta:
        model = models.BreedWeightGuideline
        fields = {
            'breed': ['in', 'exact']
        }


class BreedEggGuidelineFilter(CoreFilterSet):
    class Meta:
        model = models.BreedEggGuideline
        fields = {
            'breed': ['in', 'exact']
        }


class BreedFeedGuidelineFilter(CoreFilterSet):
    class Meta:
        model = models.BreedFeedGuideline
        fields = {
            'breed': ['in', 'exact']
        }
