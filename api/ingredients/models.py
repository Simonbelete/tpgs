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
    dm = models.FloatField(default=0)
    me = models.FloatField(default=0)
    cp = models.FloatField(default=0)
    lys = models.FloatField(default=0)
    meth = models.FloatField(default=0)
    mc = models.FloatField(default=0)
    # Fat
    ee = models.FloatField(default=0)
    # Fiber
    cf = models.FloatField(default=0)
    ca = models.FloatField(default=0)
    p = models.FloatField(default=0)
