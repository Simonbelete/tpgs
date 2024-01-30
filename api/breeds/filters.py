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
