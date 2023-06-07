from rest_framework import serializers
from . import models
from nutrients.serializers import NutrientSerializer_POST
from nutrients.models import Nutrient


class IngredientTypeSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientType
        fields = '__all__'


class IngredientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = '__all__'


class IngredientNutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient
        fields = ['nutrient', 'value']

#     # def create(self, validated_data):
#     #     validated_data.pop('ingredients')
#     #     instance = super().create(validated_data)
#     #     return instance


class IngredientNutrientSerializer_REF_POST(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(queryset=Nutrient.objects.all())
    value = serializers.FloatField()


class IngredientSerializer_POST(serializers.ModelSerializer):
    nutrients = IngredientNutrientSerializer_REF_POST(many=True)

    class Meta:
        model = models.Ingredient
        fields = ['name', 'code',
                  'description', 'price', 'price_unit', 'nutrients']

    def create(self, validated_data):
        nutrients = validated_data.pop('nutrients', None)
        instance = models.Ingredient.objects.create(**validated_data)
        for nutrient in nutrients:
            models.IngredientNutrient.objects.create(
                ingredient=instance, nutrient=nutrient['id'], value=nutrient['value'])
        return instance


class IngredientNutrientSerializer_GET(serializers.ModelSerializer):
    # nutrient = NutrientSerializer_GET()

    class Meta:
        model = models.IngredientNutrient
        fields = '__all__'
