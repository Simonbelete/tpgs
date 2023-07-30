from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from . import models
from . import serializers


class IngredientTypeViewSet(viewsets.ModelViewSet):
    queryset = models.IngredientType.objects.all()
    serializer_class = serializers.IngredientTypeSerializer_GET


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = models.Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.IngredientSerializer_POST
        return serializers.IngredientSerializer_GET


class IngredientNutrientViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.IngredientNutrientSerializer_GET

    def get_queryset(self):
        return models.IngredientNutrient.objects.filter(ingredient=self.kwargs['ingredient_pk'])

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.IngredientNutrientSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.IngredientNutrientSerializer_PATCH
        return serializers.IngredientNutrientSerializer_GET
