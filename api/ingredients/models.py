from django.db import models
from django.db.models import Count, Sum, Avg, F, Q
from simple_history.models import HistoricalRecords

from core.models import CoreModel
from core.validators import PERCENTAGE_VALIDATOR


class IngredientType(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    history = HistoricalRecords()

    @property
    def display_name(self):
        return self.name


class IngredientNutrient(CoreModel):
    ingredient = models.ForeignKey(
        'ingredients.Ingredient', on_delete=models.CASCADE)
    nutrient = models.ForeignKey(
        'nutrients.Nutrient', on_delete=models.CASCADE)
    # Value by Dry Matter
    value = models.DecimalField(
        max_digits=7, decimal_places=3, null=True, blank=True, default=0)
    history = HistoricalRecords()

    class Meta:
        unique_together = ['ingredient', 'nutrient']

    @property
    def display_name(self):
        return "{ingredient} - {nutrient}".format(
            ingredient=self.ingredient.name,
            nutrient=self.nutrient.name
        )

    @property
    def unit(self):
        return self.nutrient.unit.name

    @property
    def as_feed_value(self):
        """Dry matter to as feed conversion 
        """
        return self.value * self.ingredient.dm / 100


class Ingredient(CoreModel):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=100, null=True, blank=True)
    ingredient_type = models.ManyToManyField(
        IngredientType, null=True, blank=True, related_name='ingredients')
    description = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=3, null=True, blank=True, default=0)  # kg
    # price = MoneyField(max_digits=14, null=True, blank=True, default=0,
    #                    decimal_places=2, default_currency='ETB')
    # price_unit = models.ForeignKey(
    #     Unit, default=3, on_delete=models.SET_NULL, null=True, blank=True, related_name='ingredients')
    nutrients = models.ManyToManyField(
        'nutrients.Nutrient', null=True, blank=True, through=IngredientNutrient)
    # dry material
    dm = models.PositiveIntegerField(
        validators=PERCENTAGE_VALIDATOR, default=0)

    history = HistoricalRecords()

    def __str__(self) -> str:
        return self.name

    def nutrient_count(self):
        return IngredientNutrient.objects.filter(ingredient=self.id).count()

    def composition_total(self):
        return self.nutrients.through.objects.all().aggregate(sum=Sum('value'))['sum'] or 0

    @property
    def display_name(self):
        return self.name

    @property
    def nutrient_count(self):
        return self.nutrients.count()

    def nutrient_count(self):
        return IngredientNutrient.objects.filter(ingredient=self.id).count()
