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
    queryset = models.IngredientNutrient.objects.all()
    serializer_class = serializers.IngredientNutrientSerializer_GET

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['ingredient_pk']

        queryset = self.paginate_queryset(
            self.get_queryset().filter(ingredient=pk))
        serializer = self.get_serializer(queryset, many=True)
        return self.get_paginated_response(serializer.data)

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.IngredientNutrientSerializer_POST
        return serializers.IngredientNutrientSerializer_GET
