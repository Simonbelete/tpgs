from django.db import models
from djmoney.models.fields import MoneyField
from multiselectfield import MultiSelectField

from core.models import CoreModel
from units.models import Unit
from nutrients.models import Nutrient

class Ingredient(CoreModel):
    NUTRIENT_CHOICES = [
        ('ME', 'Energy'),
        ('P', 'Protein'),
        ('FA', 'Fat'),
        ('AD', 'Additive'),
        ('FI', 'Fiber'),
        ('MI', 'Mineral')
    ]

    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='ETB')
    nutrient_sources = MultiSelectField(choices=NUTRIENT_CHOICES)
    ratio_unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, related_name='ingredients')
    ratio_min = models.FloatField()
    ratio_max = models.FloatField()

class IngredientNutritionFact(CoreModel):
    ingredient = models.ForeignKey(
        Ingredient, on_delete=models.CASCADE, related_name='nutrition_fact')
    nutrient = models.ForeignKey(
        Nutrient, on_delete=models.CASCADE, related_name='nutrition_fact')
    value = models.FloatField()