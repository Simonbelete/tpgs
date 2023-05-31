from rest_framework import serializers
from . import models


class IngredientTypeSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType
        fields = '__all__'


class IngredientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = '__all__'
