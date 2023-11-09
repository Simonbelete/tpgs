from rest_framework import serializers
from . import models
from nutrients.serializers import NutrientSerializer_POST, NutrientSerializer_GET, NutrientSerializer_SLUG
from nutrients.models import Nutrient
from django.db import transaction


# Ingredient Type
class IngredientTypeSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType
        fields = ['id', 'name', 'display_name', 'is_active']


class IngredientTypeSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType
        fields = ['id', 'name', 'display_name']


class IngredientTypeSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType
        fields = ['id', 'name', 'is_active']


class IngredientTypeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType.history.__dict__['model']
        fields = '__all__'


# Ingredient

class IngredientSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = ['id', 'name', 'display_name']


class IngredientSerializer_GET(serializers.ModelSerializer):
    ingredient_type = IngredientTypeSerializer_SLUG()

    class Meta:
        model = models.Ingredient
        fields = ['id', 'name', 'display_name', 'code', 'nutrient_count',
                  'ingredient_type', 'description', 'price', 'dm', 'is_active']


class IngredientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = ['name', 'code', 'description', 'price',
                  'nutrients', 'dm', 'ingredient_type', 'is_active']


class IngredientHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient.history.__dict__['model']
        fields = '__all__'


# Ingredient Nutrients
class IngredientNutrientSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()
    ingredient = IngredientSerializer_SLUG()

    class Meta:
        model = models.IngredientNutrient
        fields = ['id', 'display_name', 'nutrient',
                  'ingredient', 'value', 'as_feed_value', 'unit', 'is_active']


class IngredientNutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient
        fields = ['id', 'nutrient', 'value']

    def create(self, validated_data):
        if ('ingredient_pk' in self.context["view"].kwargs):
            ingredient = models.Ingredient.objects.get(
                pk=self.context["view"].kwargs["ingredient_pk"])
            validated_data['ingredient'] = ingredient
        return super().create(validated_data)


class IngredientNutrientHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient.history.__dict__['model']
        fields = '__all__'
