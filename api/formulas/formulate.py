import pandas as pd
from nutrients.models import Nutrient
from ingredients.models import Ingredient, IngredientNutrient
from . import models
from djmoney.money import Money
from decimal import Decimal
from django.db.models.signals import post_save


class Formulate:
    def __init__(self, formula) -> None:
        self.formula = formula
        self.rations = {}
        self.ration_dm = 0
        self.ration_price = 0
        self.ration_ratio = 0
        self.ration_weight = 0

    def get_ingredients(self):
        return self.formula.ingredients.all()

    def compute(self):
        headers = list(Nutrient.objects.all().values_list(
            'abbreviation', flat=True))
        formula_ingredients = models.FormulaIngredient.objects.filter(
            formula=self.formula.id)
        self.rations = dict.fromkeys(headers, 0)
        for fing in formula_ingredients.iterator():
            ing_nutr = IngredientNutrient.objects.filter(ingredient=fing.id)
            for n in ing_nutr.iterator():
                self.rations[n.nutrient.abbreviation] += fing.ration * \
                    n.value / 100
            ing_contri_per_kg = self.formula.weight * fing.ration / 100
            self.ration_dm += (fing.ingredient.dm or 0) * fing.ration / 100
            self.ration_price += (fing.ingredient.price or 0) * ing_contri_per_kg
            self.ration_ratio += fing.ration
            self.ration_weight += ing_contri_per_kg
        print('-------------------')
        print(self.rations)
        return {'rations': self.rations, 'ration_dm': self.ration_dm, 'ration_price': self.ration_price, 'ration_ratio': self.ration_ratio}

    def save(self):
        for key in self.rations:
            nutrient = Nutrient.objects.get(abbreviation=key)
            models.FormulaRation.objects.update_or_create(
                formula=self.formula, nutrient=nutrient, defaults={'value': self.rations[key]})
        self.formula.ration_price = self.ration_price
        self.formula.ration_ratio = self.ration_ratio
        self.formula.ration_dm = self.ration_dm
        self.formula.ration_weight = self.ration_weight
        return self.formula.save()
