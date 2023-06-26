from rest_framework import serializers
from . import models
from units.serializers import UnitSerializer_GET


class NutrientGroupSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.NutrientGroup
        fields = '__all__'


class NutrientSerializer_GET(serializers.ModelSerializer):
    nutrient_group = NutrientGroupSerializer_GET()
    unit = UnitSerializer_GET()

    class Meta:
        model = models.Nutrient
        fields = '__all__'


class NutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Nutrient
        fields = '__all__'
