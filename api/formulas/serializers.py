from rest_framework import serializers
from django.db import transaction

from . import models
from nutrients.models import Nutrient
from ingredients.models import Ingredient
from ingredients.serializers import IngredientSerializer_GET
from nutrients.serializers import AllNutrientSerializer_GET, NutrientSerializer_SLUG
from purposes.serializers import PurposeSerializer_GET
from requirements.serializers import RequirementSerializer_SLUG


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


class FormulaRationSerializer_REF(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRation
        fields = ['nutrient', 'value']


class FormulaIngredientSerializer_REF(serializers.ModelSerializer):
    # Ingredient Id
    # id = serializers.IntegerField()
    # ingredient = serializers.IntegerField()

    class Meta:
        model = models.FormulaIngredient
        fields = ['ingredient', 'ration']


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
    requirement = RequirementSerializer_SLUG()

    class Meta:
        model = models.Formula
        fields = ['id', 'name', 'display_name', 'purpose', 'weight', 'note', 'budget', 'desired_ratio', 'desired_dm',
                  'ration_price', 'ration_ratio', 'ration_weight', 'ration_dm', 'requirement', 'unit_price',
                  'requirement_count', 'ingredient_count']


class FormulaSerializer_POST(serializers.ModelSerializer):
    requirements = FormulaRequirementSerializer_REF(
        source="formularequirement", many=True, required=False)
    rations = FormulaRationSerializer_REF(
        source="formularation", many=True, required=False)
    ingredients = FormulaIngredientSerializer_REF(
        source="formulaingredient", many=True, required=False)
    # ingredients = FormulaIngredientSerializer_REF(source='formulaingredient.ingredient',many=True, required=False)

    class Meta:
        model = models.Formula
        fields = ['id', 'name', 'weight', 'requirements', 'budget', 'desired_ratio', 'desired_dm', 'ingredients', 'requirement',
                  'rations', 'ration_price', 'ration_ratio', 'ration_dm',  'age_from_week', 'age_to_week']

    @transaction.atomic
    def create(self, validated_data):
        requirements = validated_data.pop('formularequirement', [])
        rations = validated_data.pop('rations', [])
        ingredients = validated_data.pop('formulaingredient', [])
        instance = models.Formula.objects.create(**validated_data)

        for requirement in requirements:
            nut = requirement.pop('nutrient')
            models.FormulaRequirement.objects.update_or_create(
                formula=instance, nutrient=nut, defaults={'formula': instance, **requirement})
        for ration in rations:
            nut = ration.pop('nutrient')
            models.FormulaRation.objects.update_or_create(
                formula=instance, nutrient=nut, defaults={'formula': instance, **ration})
        for ingredient in ingredients:
            print(ingredient)
            inp = ingredient.pop('ingredient')
            models.FormulaIngredient.objects.update_or_create(
                formula=instance, ingredient=inp, defaults={'formula': instance, 'ingredient': inp, **ingredient})
        return instance

    @transaction.atomic
    def update(self, instance, validated_data):
        requirements = validated_data.pop('formularequirement', [])
        rations = validated_data.pop('rations', [])
        ingredients = validated_data.pop('formulaingredient', [])

        for requirement in requirements:
            nut = requirement.pop('nutrient')
            models.FormulaRequirement.objects.update_or_create(
                formula=instance, nutrient=nut, defaults={'formula': instance, **requirement})
        for ration in rations:
            nut = ration.pop('nutrient')
            models.FormulaRation.objects.update_or_create(
                formula=instance, nutrient=nut, defaults={'formula': instance, **ration})
        for ingredient in ingredients:
            inp = ingredient.pop('ingredient')
            models.FormulaIngredient.objects.update_or_create(
                formula=instance, ingredient=inp, defaults={'formula': instance, 'ingredient': inp, **ingredient})
        return super().update(instance, validated_data)


# Formula Requirements
class FormulaRequirementSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()

    class Meta:
        model = models.FormulaRequirement
        fields = '__all__'


class AllFormulaRequirementSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()

    class Meta:
        model = models.FormulaRequirement
        fields = ['id', 'nutrient', 'value']


class FormulaRequirementSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRequirement
        fields = ['id', 'nutrient', 'value']

    def create(self, validated_data):
        if ('formula_pk' in self.context["view"].kwargs):
            formula = models.Formula.objects.get(
                pk=self.context["view"].kwargs["formula_pk"])
            validated_data['formula'] = formula
        return super().create(validated_data)


class FormulaRequirementHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRequirement.history.__dict__['model']
        fields = '__all__'


# Formula Rations
class FormulaRationSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()

    class Meta:
        model = models.FormulaRation
        fields = ['id', 'formula', 'nutrient', 'value']


class AllFormulaRationSerializer_GET(serializers.ModelSerializer):
    nutrient = AllNutrientSerializer_GET()

    class Meta:
        model = models.FormulaRation
        fields = ['id', 'nutrient', 'value']


class FormulaRationSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRation
        fields = ['id', 'nutrient', 'value']

        def create(self, validated_data):
            if ('formula_pk' in self.context["view"].kwargs):
                formula = models.Formula.objects.get(
                    pk=self.context["view"].kwargs["formula_pk"])
                validated_data['formula'] = formula
            return super().create(validated_data)


class FormulaRationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaRation.history.__dict__['model']
        fields = '__all__'


# Formula Ingredients
class FormulaIngredientSerializer_GET(serializers.ModelSerializer):
    ingredient = IngredientSerializer_GET()

    class Meta:
        model = models.FormulaIngredient
        fields = ['id', 'formula', 'ingredient',
                  'price', 'ration', 'ration_weight', 'ration_price']


class FormulaIngredientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaIngredient
        fields = ['id', 'ingredient', 'ration']

    def create(self, validated_data):
        if ('formula_pk' in self.context["view"].kwargs):
            formula = models.Formula.objects.get(
                pk=self.context["view"].kwargs["formula_pk"])
            validated_data['formula'] = formula
        return super().create(validated_data)


class FormulaIngredientHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FormulaIngredient.history.__dict__['model']
        fields = '__all__'


class AllFormulaIngredientSerializer_GET(serializers.ModelSerializer):
    ingredient = IngredientSerializer_GET()

    class Meta:
        model = models.FormulaIngredient
        fields = ['id', 'ingredient', 'price',
                  'ration', 'ration_weight', 'ration_price']
