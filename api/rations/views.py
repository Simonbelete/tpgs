from django.shortcuts import render
from rest_framework import viewsets, status
from . import models
from . import serializers


class RationViewSet(viewsets.ModelViewSet):
    queryset = models.Ration.objects.all()
    serializer_class = serializers.RationSerializer_GET

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.RationSerializer_GET
        return serializers.RationSerializer_POST


class RationIngredientViewSet(viewsets.ModelViewSet):
    queryset = models.RationIngredient.objects.all()
    serializer_class = serializers.RationIngredientSerializer_GET

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.RationIngredientSerializer_GET
        return serializers.RationIngredientSerializer_POST
