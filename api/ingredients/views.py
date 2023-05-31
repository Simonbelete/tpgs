from django.shortcuts import render
from rest_framework import viewsets, status
from . import models
from . import serializers


class IngredientTypeViewSet(viewsets.ModelViewSet):
    queryset = models.IngredientType.objects.all()
    serializer_class = serializers.IngredientTypeSerializer_GET


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = models.Ingredient.objects.all()
    serializer_class = serializers.IngredientSerializer_GET
