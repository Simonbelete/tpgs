from django_filters import rest_framework as filters

from . import models

class NutrientGroupFilter(filters.FilterSet):
    name = filters.CharFilter(
        field_name='name', lookup_expr='contains')

    class Meta:
        model = models.NutrientGroup
        fields = ['name']

class NutrientFilter(filters.FilterSet):
    class Meta:
        model = models.Nutrient
        fields = {
            'nutrient_group': ['in', 'exact']
        }
