from django.db import models
from simple_history.models import HistoricalRecords
from django.db.models import Sum

from core.models import CoreModel
from core.validators import PERCENTAGE_VALIDATOR


class RequirementNutrient(CoreModel):
    requirement = models.ForeignKey(
        'requirements.Requirement', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    value = models.DecimalField(
        max_digits=7, decimal_places=3, null=True, blank=True, default=0)
    history = HistoricalRecords()

    class Meta:
        ordering = ['nutrient']
        unique_together = ['requirement', 'nutrient']

    @property
    def unit(self):
        return self.nutrient.unit.name

    @property
    def as_feed_value(self):
        """Dry matter to as feed conversion 
        """
        return self.value * self.requirement.desired_dm / 100


class RequirementIngredient(CoreModel):
    requirement = models.ForeignKey(
        'requirements.Requirement', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(
        'ingredients.Ingredient', on_delete=models.CASCADE)
    min = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=6, decimal_places=3, default=0, null=True, blank=True)
    max = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=6, decimal_places=3, default=0, null=True, blank=True)

    history = HistoricalRecords()

    class Meta:
        ordering = ['ingredient']
        unique_together = ['requirement', 'ingredient']


class Requirement(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    nutrients = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=RequirementNutrient, related_name='requirement_nutrients')
    ingredients = models.ManyToManyField(
        'ingredients.Ingredient', null=True, blank=True, through=RequirementIngredient, related_name='requirement_ingredients')
    weight = models.DecimalField(
        max_digits=7, decimal_places=3, null=True, blank=True, default=0)  # kg
    # Unit Price
    budget = models.DecimalField(
        max_digits=10, decimal_places=3, null=True, blank=True, default=0)  # per kg
    desired_ratio = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=100)
    desired_dm = models.DecimalField(
        validators=PERCENTAGE_VALIDATOR, max_digits=15, decimal_places=3, default=0)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    @property
    def display_name(self):
        return self.name

    @property
    def nutrient_count(self):
        return self.nutrients.count()

    @property
    def ingredient_count(self):
        return self.ingredients.count()

    def nutrient_count(self):
        return RequirementNutrient.objects.filter(requirement=self.id).count()

    def composition_total(self):
        return self.nutrients.through.objects.all().aggregate(sum=Sum('value'))['sum'] or 0
