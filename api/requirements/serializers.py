from rest_framework import serializers
from django.db import transaction

from users.serializers import UserSerializer_SLUG
from nutrients.serializers import NutrientSerializer_SLUG, AllNutrientSerializer_GET
from nutrients.models import Nutrient
from . import models


class RequirementSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Requirement
        fields = ['id', 'name', 'display_name',
                  'nutrient_count', 'weight', 'budget',
                  'desired_ratio', 'desired_dm', ]


class RequirementSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Requirement
        fields = ['id', 'name']


class RequirementNutrientSerializer_REF(serializers.ModelSerializer):
    class Meta:
        model = models.RequirementNutrient
        fields = ['nutrient', 'value']


class RequirementSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Requirement
        # TODO:
        fields = ['id', 'display_name', 'name',
                  'weight', 'budget', 'desired_ratio', 'desired_dm']


class RequirementHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_SLUG()

    class Meta:
        model = models.Requirement.history.__dict__['model']
        fields = '__all__'


# Requirement Nutrients

class RequirementNutrientSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()
    requirement = RequirementSerializer_SLUG()

    class Meta:
        model = models.RequirementNutrient
        fields = ['id', 'nutrient', 'requirement',
                  'value', 'as_feed_value', 'unit']


class RequirementNutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.RequirementNutrient
        fields = ['id', 'nutrient', 'value']

    def create(self, validated_data):
        if ('requirement_pk' in self.context["view"].kwargs):
            requirement = models.Requirement.objects.get(
                pk=self.context["view"].kwargs["requirement_pk"])
            validated_data['requirement'] = requirement
        return super().create(validated_data)


class RequirementNutrientHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RequirementNutrient.history.__dict__['model']
        fields = '__all__'


class AllIngredientNutrientSerializer_GET(serializers.ModelSerializer):
    nutrient = AllNutrientSerializer_GET()

    class Meta:
        model = models.RequirementNutrient
        fields = ['id', 'value', 'nutrient']
