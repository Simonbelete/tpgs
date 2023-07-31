from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import serializers


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
    def get_queryset(self):
        return models.Formula.objects.filter(pk=self.kwargs['formula_pk'])

    def create(self, request, formula_pk=None):
        return Response({})
