from typing import Iterable, Optional
from django.db import models
from simple_history.models import HistoricalRecords
from django.core.exceptions import ValidationError
from cities_light.models import Country
from djmoney.models.fields import MoneyField

from core.models import CoreModel
from purposes.models import Purpose
from units.models import Unit


class FormulaRequirement(CoreModel):
    formula = models.ForeignKey('formulas.Formula', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.FloatField(default=0, null=True, blank=True)


class FormulaIngredient(CoreModel):
    formula = models.ForeignKey('formulas.Formula', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(
        'ingredients.Ingredient', on_delete=models.CASCADE)
    ratio_min = models.FloatField(default=0, null=True)  # %
    ratio_max = models.FloatField(default=0, null=True)  # %
    ration = models.FloatField(default=0, null=True, blank=True)  # %

    class Meta:
        unique_together = ['formula', 'ingredient']

    def save(self,  *args, **kwargs) -> None:
        return super().save(*args, **kwargs)

    def clean(self) -> None:
        if (self.ratio_min > self.ration_max):
            raise ValidationError(
                'Ratio minium can not be greater than maximum')
        if (self.ration >= self.ration_min and self.ration <= self.ration_max):
            raise ValidationError('Ration must be between min and max')
        return super().clean()

    @property
    def qty(self):
        return self.formula.weight * self.ration / 100


class Formula(CoreModel):
    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )
    FORMULA_BASIS = (
        ('AF', 'As-Fed Basis'),
        ('DM', 'DM Basis')
    )

    name = models.CharField(max_length=100)
    purpose = models.ForeignKey(
        Purpose, on_delete=models.SET_NULL, null=True, blank=True)
    weight = models.FloatField(null=True, blank=True, default=0)
    weight_unit = models.ForeignKey(
        Unit, on_delete=models.SET_NULL, null=True, blank=True, default=3)  # kg
    country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True, blank=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES,
                           null=True, blank=True, default=None)
    budget = MoneyField(max_digits=14, null=True, blank=True, default=0,
                        decimal_places=2, default_currency='ETB')
    age_from_week = models.PositiveIntegerField()
    age_to_week = models.PositiveBigIntegerField()
    formula_basis = models.CharField(max_length=4, choices=FORMULA_BASIS,
                                     null=True, blank=True, default=None)
    note = models.TextField(null=True, blank=True)
    requirements = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=FormulaRequirement)
    ingredients = models.ManyToManyField(
        'ingredients.Ingredient', null=True, blank=True, through=FormulaIngredient)

    @property
    def requirement_count(self):
        return self.requirements.count()

    @property
    def ingredient_count(self):
        return self.ingredients.count()
