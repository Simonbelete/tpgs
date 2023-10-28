from rest_framework import serializers
from django.db import transaction

from . import models
from nutrients.models import Nutrient
from ingredients.models import Ingredient
from ingredients.serializers import IngredientSerializer_GET
from nutrients.serializers import NutrientSerializer_POST, NutrientSerializer_GET, NutrientSerializer_SLUG
from purposes.serializers import PurposeSerializer_GET

# Formula -> Requirements


class FormulaRequirementSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()

    class Meta:
        model = models.FormulaRequirement
        fields = '__all__'


class FormulaRequirementSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRequirement
        fields = ['id', 'nutrient', 'value']

    def create(self, validated_data):
        formula = models.Formula.objects.get(
            pk=self.context["view"].kwargs["formula_pk"])
        validated_data['formula'] = formula
        return super().create(validated_data)


class FormulaRequirementSerializer_REF(serializers.ModelSerializer):
    # nutrient = serializers.PrimaryKeyRelatedField(
    #     queryset=Nutrient.objects.all(), read_only=False)
    # Nutrient Id
    # id = serializers.IntegerField()

    class Meta:
        model = models.FormulaRequirement
        fields = ['nutrient', 'value']


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


# Formula -> Ration


class FormulaRationSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_GET()

    class Meta:
        model = models.FormulaRation 
        fields = ['id', 'formula', 'nutrient', 'value']


class FormulaRationSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRation
        fields = ['id', 'nutrient', 'value']

    def create(self, validated_data):
        formula = models.Formula.objects.get(
            pk=self.context["view"].kwargs["formula_pk"])
        validated_data['formula'] = formula
        return super().create(validated_data)


class FormulaRationSerializer_REF(serializers.ModelSerializer):
    # nutrient = serializers.PrimaryKeyRelatedField(read_only=True)
    # Nutrient Id
    # id = serializers.IntegerField()

    class Meta:
        model = models.FormulaRation
        fields = ['nutrient', 'value']


class FormulaRationSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRation
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
    ingredient = IngredientSerializer_GET()

    class Meta:
        model = models.FormulaIngredient
        fields = ['id', 'formula', 'ingredient', 'ratio_min', 'ratio_max', 'price', 'ration', 'ration_weight', 'ration_price']

class IngredientSerializer_DEPTH_2(serializers.ModelSerializer):
    
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'nutrient']

class FormulaIngredientSerializer_GET_DEPTH_2(serializers.ModelSerializer):
    ingredient = IngredientSerializer_GET()

    class Meta:
        model = models.FormulaIngredient
        fields = ['id', 'formula', 'ingredient', 'ratio_min', 'ratio_max', 'price', 'ration', 'ration_weight', 'ration_price']


class FormulaIngredientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaIngredient
        fields = ['id', 'ingredient', 'ratio_min', 'ratio_max', 'ration']

    def create(self, validated_data):
        formula = models.Formula.objects.get(
            pk=self.context["view"].kwargs["formula_pk"])
        validated_data['formula'] = formula
        return super().create(validated_data)


class FormulaIngredientSerializer_REF(serializers.ModelSerializer):
    # Ingredient Id
    # id = serializers.IntegerField()
    # ingredient = serializers.IntegerField()

    class Meta:
        model = models.FormulaIngredient
        fields = ['ingredient', 'ratio_min', 'ratio_max', 'ration']


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
    purpose = PurposeSerializer_GET()

    class Meta:
        model = models.Formula
        fields = ['id', 'name', 'purpose', 'weight', 'note', 'budget', 'desired_ratio', 'desired_dm',
                    'ration_price', 'ration_ratio', 'ration_weight', 'ration_dm',
                  'requirement_count', 'ingredient_count']


class FormulaSerializer_POST(serializers.ModelSerializer):
    requirements = FormulaRequirementSerializer_REF(source="formularequirement", many=True, required=False)
    rations = FormulaRationSerializer_REF(source="formularation" ,many=True, required=False)
    ingredients = FormulaIngredientSerializer_REF(source="formulaingredient", many=True, required=False)
    # ingredients = FormulaIngredientSerializer_REF(source='formulaingredient.ingredient',many=True, required=False)

    class Meta:
        model = models.Formula
        fields = ['name', 'weight', 'requirements', 'budget', 'desired_ratio', 'desired_dm', 'ingredients',
                  'rations', 'ration_price', 'ration_ratio', 'ration_dm',  'age_from_week', 'age_to_week']

    @transaction.atomic
    def create(self, validated_data):
        requirements = validated_data.pop('formularequirement', [])
        rations = validated_data.pop('formularation', [])
        ingredients = validated_data.pop('formulaingredient', [])
        instance = models.Formula.objects.create(**validated_data)
        for requirement in requirements:
            models.FormulaRequirement.objects.create(
                formula=instance, **requirement)
        for ration in rations:
            models.FormulaRation.objects.create(
                formula=instance, **ration)
        for ingredient in ingredients:
            inp = ingredient.pop('ingredient')
            models.FormulaIngredient.objects.create(
                formula=instance, ingredient=inp, **ingredient)
        return instance

# TODO: depth to 1
class FormulaRationSerializer_FORMULATE(serializers.ModelSerializer):
    nutrient = serializers.SlugRelatedField(
        read_only=True,
        slug_field='abbreviation'
    )
    class Meta:
        model = models.FormulaRation
        fields = ['id', 'value', 'nutrient', 'achived_goal']

class FormulaIngredientSerializer_FORMULATE(serializers.ModelSerializer):
    ingredient = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = models.FormulaIngredient
        fields = ['id', 'ingredient', 'ration_weight','ration_price']

class FormulaRequirementSerializer_FORMULATE(serializers.ModelSerializer):
    nutrient = serializers.SlugRelatedField(
        read_only=True,
        slug_field='abbreviation'
    )
    class Meta:
        model = models.FormulaRequirement
        fields = ['id', 'nutrient', 'value']

class FormulateSerializer_POST(serializers.ModelSerializer):
    requirements = FormulaRequirementSerializer_FORMULATE(source="formularequirement_set", many=True)
    rations = FormulaRationSerializer_FORMULATE(source="formularation_set", many=True, read_only=True)
    ingredients = FormulaIngredientSerializer_FORMULATE(source="formulaingredient_set", many=True, read_only=True)

    class Meta:
        model = models.Formula
        fields = ['id', 'requirements', 'rations', 'weight',
                'budget', 'desired_ratio', 'desired_dm', 'ingredients',
                  'ration_price', 'ration_ratio', 'ration_weight', 'ration_dm',
                  'requirement_count', 'ingredient_count']