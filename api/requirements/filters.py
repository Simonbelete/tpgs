from django_filters import rest_framework as filters

from . import models


class RequirementNutrientFilter(filters.FilterSet):
    nutrient_group = filters.CharFilter(
        field_name='nutrient__nutrient_group__name', lookup_expr="exact")
    nutrient_group_not = filters.CharFilter(
        field_name='nutrient__nutrient_group__name', exclude=True)
    nutrient_group_id = filters.NumberFilter(
        field_name='nutrient__nutrient_group', lookup_expr="exact")

    class Meta:
        model = models.RequirementNutrient
        fields = ['nutrient_group_id', 'nutrient_group',
                  'nutrient_group_not', 'is_active']


class RequirementFilter(filters.FilterSet):
    class Meta:
        model = models.Requirement
        fields = ['is_active']


class RequirementIngredientFilter(filters.FilterSet):
    class Meta:
        model = models.RequirementIngredient
        fields = ['is_active']
