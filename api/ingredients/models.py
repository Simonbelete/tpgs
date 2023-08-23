from django.db import models
from djmoney.models.fields import MoneyField
from multiselectfield import MultiSelectField
from units.models import Unit

from core.models import CoreModel
from core.validators import PERCENTAGE_VALIDATOR


class IngredientType(CoreModel):
    name = models.CharField(max_length=100, unique=True)


class IngredientNutrient(models.Model):
    ingredient = models.ForeignKey(
        'ingredients.Ingredient', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.FloatField(default=0, null=True, blank=True)


class Ingredient(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=100, null=True, blank=True)
    ingredient_type = models.ManyToManyField(
        IngredientType, null=True, blank=True, related_name='ingredients')
    description = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=3, null=True, blank=True, default=0)
    # price = MoneyField(max_digits=14, null=True, blank=True, default=0,
    #                    decimal_places=2, default_currency='ETB')
    price_unit = models.ForeignKey(
        Unit, default=3, on_delete=models.SET_NULL, null=True, blank=True, related_name='ingredients')
    nutrients = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=IngredientNutrient)
    # dry material
    dm = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, default=0)

    def __str__(self) -> str:
        return self.name
