from django.db import models

# Saved Feed Formulations


class Ration(models.Model):
    name = models.CharField(max_length=100)


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
