from django.db import models
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from purposes.models import Purpose


class FormulaRequirement(CoreModel):
    formula = models.ForeignKey('formulas.Formula', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.FloatField(default=0, null=True, blank=True)


class FormulaIngredient(CoreModel):
    formula = models.ForeignKey('formulas.Formula', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(
        'ingredients.Ingredient', on_delete=models.CASCADE)
    ratio_min = models.FloatField(default=0, null=True)
    ratio_max = models.FloatField(default=0, null=True)


class Formula(CoreModel):
    name = models.CharField(max_length=100)
    purpose = models.ForeignKey(
        Purpose, on_delete=models.SET_NULL, null=True, blank=True)
    weight = models.FloatField()
    note = models.TextField(null=True, blank=True)
    requirements = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=FormulaRequirement)
    ingredients = models.ManyToManyField(
        'ingredients.Ingredient', null=True, blank=True, through=FormulaIngredient)
