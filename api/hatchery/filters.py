from django_filters import rest_framework as filters

from . import models

class IncubationFilter(filters.FilterSet):
    class Meta:
        model = models.Incubation
        fields = ['is_active']