from django.shortcuts import render
from rest_framework import viewsets, status
from . import models
from . import serializers


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = models.Recipes.objects.all()
    serializer_class = serializers.Recipe_GET
