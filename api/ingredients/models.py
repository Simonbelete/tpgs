from django.db import models
from djmoney.models.fields import MoneyField
from multiselectfield import MultiSelectField
from units.models import Unit

from core.models import CoreModel


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
    price = MoneyField(max_digits=14, null=True, blank=True, default=0,
                       decimal_places=2, default_currency='ETB')
    price_unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True, related_name='ingredients')
    nutrients = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=IngredientNutrient)
    # ratio_min = models.FloatField(default=0, null=True)
    # ratio_max = models.FloatField(default=0, null=True)
    # # Nutrients
    # dm = models.FloatField(default=0, null=True)
    # me = models.FloatField(default=0, null=True)
    # cp = models.FloatField(default=0, null=True)
    # lys = models.FloatField(default=0, null=True)
    # meth = models.FloatField(default=0, null=True)
    # mc = models.FloatField(default=0, null=True)
    # # Fat
    # ee = mrilimo2516odels.FloatField(default=0, null=True)
    # # Fiber
    # cf = models.FloatField(default=0, null=True)
    # ca = models.FloatField(default=0, null=True)
    # p = models.FloatField(default=0, null=True)

    def __str__(self) -> str:
        return self.name
