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
    price = MoneyField(max_digits=14, null=True,
                       decimal_places=2, default_currency='ETB')
    ratio_min = models.FloatField(default=0, null=True)
    ratio_max = models.FloatField(default=0, null=True)
    # Nutrients
    dm = models.FloatField(default=0, null=True)
    me = models.FloatField(default=0, null=True)
    cp = models.FloatField(default=0, null=True)
    lys = models.FloatField(default=0, null=True)
    meth = models.FloatField(default=0, null=True)
    mc = models.FloatField(default=0, null=True)
    # Fat
    ee = models.FloatField(default=0, null=True)
    # Fiber
    cf = models.FloatField(default=0, null=True)
    ca = models.FloatField(default=0, null=True)
    p = models.FloatField(default=0, null=True)

    def __str__(self) -> str:
        return self.name
