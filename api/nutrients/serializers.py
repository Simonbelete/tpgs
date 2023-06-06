from rest_framework import serializers
from . import models


class NutrientGroupSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.NutrientGroup
        fields = '__all__'


class NutrientSerializer_GET(serializers.ModelSerializer):
    nutrient_group = NutrientGroupSerializer_GET()

    class Meta:
        model = models.Nutrient
        fields = '__all__'
