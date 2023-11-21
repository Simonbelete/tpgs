from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models


class IngredientTypeFilter(CoreFilterSet):
    class Meta:
        model = models.IngredientType
        fields = {
            'name': ['exact'],
        }


class IngredientFilter(CoreFilterSet):
    class Meta:
        model = models.Ingredient
        fields = {
            'name': ['exact'],
            'ingredient_type': ['in', 'exact']
        }


class IngredientNutrientFilter(CoreFilterSet):
    nutrient_group = filters.CharFilter(
        field_name='nutrient__nutrient_group__name', lookup_expr="exact")
    nutrient_group_not = filters.CharFilter(
        field_name='nutrient__nutrient_group__name', exclude=True)
    nutrient_group_id = filters.NumberFilter(
        field_name='nutrient__nutrient_group', lookup_expr="exact")

    class Meta:
        model = models.IngredientNutrient
        fields = {
            'ingredient': ['in', 'exact']
        }
