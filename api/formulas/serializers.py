from rest_framework import serializers

from . import models
from nutrients.models import Nutrient
from ingredients.models import Ingredient

# Formula -> Requirements


class FormulaRequirementSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRequirement
        fields = '__all__'


class FormulaRequirementSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRequirement
        fields = '__all__'

    def create(self, validated_data):
        formula = models.Formula.objects.get(
            pk=self.context["view"].kwargs["formula_pk"])
        validated_data['formula'] = formula
        return super().create(validated_data)


class FormulaRequirementSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRequirement
        fields = '__all__'

    def create(self, validated_data):
        formula = models.Formula.objects.get(
            pk=self.context["view"].kwargs["formula_pk"])
        nutrient = Nutrient.objects.get(
            pk=self.context["view"].kwargs["id"])
        validated_data['formula'] = formula
        validated_data['nutrient'] = nutrient
        return super().create(validated_data)

# Formula -> Ingredient


class FormulaIngredientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaIngredient
        fields = '__all__'


class FormulaIngredientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaIngredient
        fields = '__all__'

    def create(self, validated_data):
        formula = models.Formula.objects.get(
            pk=self.context["view"].kwargs["formula_pk"])
        validated_data['formula'] = formula
        return super().create(validated_data)


class FormulaIngredientSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaIngredient
        fields = '__all__'

    def create(self, validated_data):
        formula = models.Formula.objects.get(
            pk=self.context["view"].kwargs["formula_pk"])
        ingredient = Nutrient.objects.get(
            pk=self.context["view"].kwargs["id"])
        validated_data['formula'] = formula
        validated_data['ingredient'] = ingredient
        return super().create(validated_data)

# Formula


class FormulaSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Formula
        fields = '__all__'


class FormulaSerializer_POST(serializers.ModelSerializer):
    requirements = FormulaRequirementSerializer_POST(many=True, required=False)
    ingredients = FormulaIngredientSerializer_POST(many=True, required=False)

    class Meta:
        model = models.Formula
        fields = '__all__'

    def create(self, validated_data):
        requirements = validated_data.pop('requirements', [])
        ingredients = validated_data.pop('ingredients', [])
        instance = models.Formula.objects.create(**validated_data)
        for requirement in requirements:
            nutrient_model = Nutrient.objects.get(
                pk=requirement['nutrient'])
            models.FormulaRequirement.objects.create(
                formula=instance, nutrient=nutrient_model, value=requirement['value'])
        for ingredient in ingredients:
            ingredient_model = Ingredient.objects.create(
                pk=ingredient['ingredient'])
            models.FormulaIngredient(
                formula=instance, ingredient=ingredient_model, **ingredient)
        return instance
