from typing import Iterable, Optional
from django.db import models
from simple_history.models import HistoricalRecords
from django.core.exceptions import ValidationError
from cities_light.models import Country
from djmoney.models.fields import MoneyField
from django.db.models import Count, Sum, Avg, F
from djmoney.money import Money
from decimal import Decimal

from core.models import CoreModel
from purposes.models import Purpose
from units.models import Unit
from core.validators import PERCENTAGE_VALIDATOR


class FormulaRequirement(CoreModel):
    formula = models.ForeignKey('formulas.Formula', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0)

    class Meta:
        unique_together = ['formula', 'nutrient']


class FormulaRation(CoreModel):
    """Formula Result
    """
    formula = models.ForeignKey('formulas.Formula', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0)

    class Meta:
        unique_together = ['formula', 'nutrient']

    @property
    def achived_goal(self):
        """Percentage acived based on formula requirement 
        """
        req = FormulaRequirement.objects.filter(formula=self.formula, nutrient=self.nutrient).aggregate(sum=Sum('value'))['sum'] or 0
        if req == 0:
            return 0
        return self.value / req * 100


class FormulaIngredient(CoreModel):
    formula = models.ForeignKey('formulas.Formula', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(
        'ingredients.Ingredient', on_delete=models.CASCADE)
    ratio_min = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=6, decimal_places=3, default=0, null=True, blank=True)
    ratio_max = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=6, decimal_places=3, default=0, null=True, blank=True)
    ration = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=6, decimal_places=3, default=0, null=True, blank=True)

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
    def price(self):
        return self.ingredient.price

    @property
    def ration_weight(self):
        return round(self.formula.weight * self.ration / 100, 3)

    @property
    def ration_price(self):
        return round(self.ration_weight * self.ingredient.price, 3)

    # def get_nutrients_ration(self):
    #     return self.ingredient.


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
    weight = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0) #kg
    # weight_unit = models.ForeignKey(
    #     Unit, on_delete=models.SET_NULL, null=True, blank=True, default=3)  # kg
    country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True, blank=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES,
                           null=True, blank=True, default=None)
    age_from_week = models.PositiveIntegerField(null=True, blank=True)
    age_to_week = models.PositiveBigIntegerField(null=True, blank=True)
    formula_basis = models.CharField(max_length=4, choices=FORMULA_BASIS,
                                     null=True, blank=True, default=None)
    note = models.TextField(null=True, blank=True)
    ingredients = models.ManyToManyField(
        'ingredients.Ingredient', null=True, blank=True, through=FormulaIngredient)
    # Requirements
    requirements = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=FormulaRequirement, related_name='formula_requirements')
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0) # per kg
    desired_ratio = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=100)
    desired_dm = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=0)
    # Rations - rations are computed based on the given weight
    # Rations shows result of formula for each nutrients
    rations = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=FormulaRation, related_name='formula_rations')
    ration_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0)
    ration_ratio = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=0)
    ration_weight = models.DecimalField(max_digits=7, decimal_places=3,null=True, blank=True, default=0)
    ration_dm = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=0)

    @property
    def requirement_count(self):
        return self.requirements.count()

    @property
    def ingredient_count(self):
        return self.ingredients.count()

    # Compute ingredient based on value
    # @property
    # def total_ingredient_weight(self):
    #     return self.ingredients.through.objects.all().annotate(ann_weight=F('formula__weight')*F('ration')/100).aggregate(ann_total_weight=Sum('ann_weight'))['ann_total_weight'] or 0
    # @property
    # def total_ingredient_price(self):
    #     return self.ingredients.through.objects.all().annotate(ann_price=F('formula__weight')*F('ration')/100 *F('ingredient__price')).aggregate(ann_total_price=Sum('ann_price'))['ann_total_price'] or 0