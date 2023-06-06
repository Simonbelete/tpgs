from django.shortcuts import render
from rest_framework import viewsets, status
from . import models
from . import serializers


class NutrientGroupViewSet(viewsets.ModelViewSet):
    queryset = models.NutrientGroup.objects.all()
    serializer_class = serializers.NutrientGroupSerializer_GET


class NutrientViewSet(viewsets.ModelViewSet):
    queryset = models.Nutrient.objects.all()
    serializer_class = serializers.NutrientSerializer_GET

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.NutrientSerializer_GET
        return serializers.NutrientSerializer_POST
