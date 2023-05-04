from django.db import models
from djmoney.models.fields import MoneyField
from multiselectfield import MultiSelectField

from core.models import CoreModel


class IngredientType(CoreModel):
    name = models.CharField(max_length=100, unique=True)


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
    ingredient_type = models.ManyToManyField(
        IngredientType, blank=True, related_name='ingredients')
    description = models.CharField(max_length=200, null=True)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='ETB')
    ratio_min = models.FloatField()
    ratio_max = models.FloatField()
    # Nutrients
    dm = models.FloatField()
    me = models.FloatField()
    cp = models.FloatField()
    lys = models.FloatField()
    meth = models.FloatField()
    mc = models.FloatField()
    ee = models.FloatField()
    cf = models.FloatField()
    ca = models.FloatField()
    p = models.FloatField()
