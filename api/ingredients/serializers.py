from rest_framework import serializers
from . import models
from nutrients.serializers import NutrientSerializer_POST, NutrientSerializer_GET, NutrientSerializer_SLUG
from nutrients.models import Nutrient
from django.db import transaction


class IngredientTypeSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType
        fields = '__all__'

class IngredientTypeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType.history.__dict__['model']
        fields = '__all__'


# Ingredient -> Nutrients
class IngredientNutrientSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()

    class Meta:
        model = models.IngredientNutrient
        fields = ['id', 'nutrient', 'ingredient', 'value', 'as_feed_value', 'unit']


class IngredientNutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient
        fields = ['id', 'nutrient', 'value']

    def create(self, validated_data):
        ingredient = models.Ingredient.objects.get(
            pk=self.context["view"].kwargs["ingredient_pk"])
        validated_data['ingredient'] = ingredient
        return super().create(validated_data)


class IngredientNutrientSerializer_REF(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = models.IngredientNutrient
        fields = ['id', 'value']


class IngredientNutrientSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient
        fields = ['value']

    def create(self, validated_data):
        ingredient = models.Ingredient.objects.get(
            pk=self.context["view"].kwargs["ingredient_pk"])
        nutrient = Nutrient.objects.get(
            pk=self.context["view"].kwargs["id"])
        validated_data['ingredient'] = ingredient
        validated_data['nutrient'] = nutrient
        return super().create(validated_data)


# Ingredient
class IngredientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = '__all__'


class IngredientSerializer_POST(serializers.ModelSerializer):
    nutrients = IngredientNutrientSerializer_REF(many=True, required=False)

    class Meta:
        model = models.Ingredient
        fields = ['name', 'code',
                  'description', 'price', 'nutrients']

    @transaction.atomic
    def create(self, validated_data):
        nutrients = validated_data.pop('nutrients', [])
        instance = models.Ingredient.objects.create(**validated_data)
        for nutrient in nutrients:
            nutrient_model = Nutrient.objects.get(
                pk=nutrient['id'])
            models.IngredientNutrient.objects.create(
                ingredient=instance, nutrient=nutrient_model, value=nutrient['value'])
        return instance

class IngredientHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient.history.__dict__['model']
        fields = '__all__'
