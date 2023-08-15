from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction

from . import models
from . import serializers
from ingredients.models import IngredientNutrient
from nutrients.serializers import NutrientSerializer_GET
from nutrients.models import Nutrient
from .formulate import Formulate


class FormulaViewSet(viewsets.ModelViewSet):
    queryset = models.Formula.objects.all()
    serializer_class = serializers.FormulaSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.FormulaSerializer_POST
        return serializers.FormulaSerializer_GET


class FormulaRequirementViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FormulaRequirementSerializer_GET

    def get_queryset(self):
        return models.FormulaRequirement.objects.filter(formula=self.kwargs['formula_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.FormulaRequirementSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.FormulaRequirementSerializer_PATCH
        return serializers.FormulaRequirementSerializer_GET


class FormulaRationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FormulaRationSerializer_GET

    def get_queryset(self):
        return models.FormulaRequirement.objects.filter(formula=self.kwargs['formula_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.FormulaRationSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.FormulaRationSerializer_PATCH
        return serializers.FormulaRationSerializer_GET

    @transaction.atomic
    def create(self, validated_data):
        requirements = validated_data.pop('requirements', [])
        rations = validated_data.pop('rations', [])
        instance = models.Formula.objects.create(**validated_data)
        for req in requirements:
            nutrient = Nutrient.objects.get(
                pk=req['nutrient'])
            models.FormulaRation.objects.create(
                formula=instance, nutrient=nutrient, value=req['value'])
        return instance


class FormulaIngredientViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FormulaIngredientSerializer_GET

    def get_queryset(self):
        return models.FormulaIngredient.objects.filter(formula=self.kwargs['formula_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.FormulaIngredientSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.FormulaIngredientSerializer_PATCH
        return serializers.FormulaIngredientSerializer_GET

# Formulate Calculation


class FormulateViewSet(viewsets.ViewSet):
    """Return computed total cost and total nutrients sum
    """

    def get_queryset(self):
        return models.Formula.objects.get(pk=self.kwargs['formula_pk'])

    def create(self, request, formula_pk=None):
        formula = self.get_queryset()
        f = Formulate(formula)
        f.compute()
        f.save()
        # requirements = formula.requirements.all()
        # ingredients = formula.ingredients.all()
        # result = []
        # for req in requirements.iterator():
        #     nu_sum = 0
        #     for ing in ingredients.iterator():
        #         curr_nu = ing.ingredient.nutrients.all().get(pk=req.nutrient.id)
        #         nu_sum += curr_nu.value * formula.ration / 100
        #     result.append({
        #         {**req, 'result': nu_sum}
        #     })
        data = serializers.FormulateSerializer_POST(self.get_queryset())
        return Response({'results': data.data})


# Formula -> Ingredient -> Nutrients
class FormulaIngredientNutrients(viewsets.ViewSet):
    def get_queryset(self):
        return models.FormulaIngredient.objects.get(formula=self.kwargs['formula_pk'], pk=self.kwargs['ingredient_pk'])

    def list(self, request, formula_pk=None, ingredient_pk=None):
        data = []
        formula_ingredient = self.get_queryset()
        for ingredient_nutrient in IngredientNutrient.objects.filter(
                ingredient=formula_ingredient.ingredient).iterator():
            data.append({
                **NutrientSerializer_GET(ingredient_nutrient.nutrient).data,
                'qty': formula_ingredient.ration * ingredient_nutrient.value / 100,
                'percentage': (formula_ingredient.qty / formula_ingredient.formula.weight) * 100
            })
        return Response({'results': data})
