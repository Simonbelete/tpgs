from rest_framework import serializers
from . import models


class IngredientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = '__all__'
