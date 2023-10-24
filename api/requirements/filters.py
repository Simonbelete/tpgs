from django_filters import rest_framework as filters

from . import models

class RequirementNutrientFilter(filters.FilterSet):
    class Meta:
        model = models.RequirementNutrient
        fields = ['is_active']

class RequirementFilter(filters.FilterSet):
    class Meta:
        model = models.Requirement
        fields = ['is_active']
