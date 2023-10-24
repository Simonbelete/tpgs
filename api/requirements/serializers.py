from rest_framework import serializers
from django.db import transaction

from users.serializers import UserSerializer_SLUG
from nutrients.serializers import NutrientSerializer_SLUG
from nutrients.models import Nutrient
from . import models

class RequirementSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Requirement
        fields = '__all__'

class RequirementNutrientSerializer_REF(serializers.ModelSerializer):
    class Meta:
        model = models.RequirementNutrient
        fields = ['nutrient', 'value']

class RequirementSerializer_POST(serializers.ModelSerializer):
    nutrients = RequirementNutrientSerializer_REF(source="requirementnutrient", many=True, required=False)

    class Meta:
        model = models.Requirement
        fields = ['name', 'nutrients']

    @transaction.atomic
    def create(self, validated_data):
        nutrients = validated_data.pop('requirementnutrient')
        instance = models.Requirement.objects.create(**validated_data)
        for nutrient in nutrients:
            models.RequirementNutrient.objects.create(
                requirement=instance, **nutrient)
        return instance
    
class RequirementHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_SLUG()

    class Meta:
        model = models.Requirement.history.__dict__['model']
        fields = '__all__'

# Nutrients
class RequirementNutrientSerializer_GET(serializers.ModelSerializer):
    nutrient = NutrientSerializer_SLUG()

    class Meta:
        model = models.RequirementNutrient
        fields = '__all__'

class RequirementNutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.RequirementNutrient
        fields = ['id', 'nutrient', 'value']

    def create(self, validated_data):
        requirement = models.Requirement.objects.get(
            pk=self.context["view"].kwargs["requirement_pk"])
        validated_data['requirement'] = requirement
        return super().create(validated_data)
    
class RequirementNutrientSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.RequirementNutrient
        fields = '__all__'

    def create(self, validated_data):
        requirement = models.Formula.objects.get(
            pk=self.context["view"].kwargs["requirement_pk"])
        nutrient = Nutrient.objects.get(
            pk=self.context["view"].kwargs["id"])
        validated_data['requirement'] = requirement
        validated_data['nutrient'] = nutrient
        return super().create(validated_data)