from rest_framework import serializers
from . import models


class RationIngredientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.RationIngredient
        fields = '__all__'

    def create(self, validated_data):
        ingredients = validated_data.pop('ingredients', None)
        instance = super().create(validated_data)
        for ingredient in ingredients:
            ing = models.RationIngredient(ration=instance, **ingredient)
            ing.save()

        return instance


class RationSerializer_GET(serializers.ModelSerializer):
    ingredients = RationIngredientSerializer_GET(many=True)

    class Meta:
        model = models.Ration
        fields = ['name', 'ingredients']
