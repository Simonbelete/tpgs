from django.db import models
from djmoney.models.fields import MoneyField

# Saved Feed Formulations


class Ration(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class RationIngredient(models.Model):
    REQUIREMENT = 'RQ'
    RATION = 'RA'
    INGREDIENT = 'IN'
    INGREDIENT_TYPE_CHOICES = [
        (REQUIREMENT, 'Requirement'),
        (RATION, 'Ration'),
        (INGREDIENT, 'Ingredient')
    ]

    ration = models.ForeignKey(
        Ration, on_delete=models.CASCADE, related_name='ingredients')
    ingredient_type = models.CharField(
        max_length=2,
        choices=INGREDIENT_TYPE_CHOICES,
        default=INGREDIENT,
    )
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='ETB')
    qty = models.FloatField(default=0)
    dm = models.FloatField(null=True)
    me = models.FloatField(null=True)
    cp = models.FloatField(null=True)
    lys = models.FloatField(null=True)
    meth = models.FloatField(null=True)
    mc = models.FloatField(null=True)
    ee = models.FloatField(null=True)
    cf = models.FloatField(null=True)
    ca = models.FloatField(null=True)
    p = models.FloatField(null=True)
    ratio_min = models.FloatField(null=True)
    ratio_max = models.FloatField(null=True)
