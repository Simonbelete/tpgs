from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class HatcheryFilter(CoreFilterSet):
    class Meta:
        model = models.Hatchery
        fields = ['stage__order']


class IncubationFilter(CoreFilterSet):
    class Meta:
        model = models.Incubation
        fields = ['is_active']
