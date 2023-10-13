from django_filters import rest_framework as filters

from core.filters import CoreFilterSet
from . import models

class IngredientTypeFilter(CoreFilterSet):
    class Meta:
        model = models.IngredientType
        fields = ['name']

class IngredientFilter(CoreFilterSet):
    class Meta:
        model = models.Ingredient
        fields = ['name', 'code']