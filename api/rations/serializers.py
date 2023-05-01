from rest_framework import serializers
from . import models


class RationIngredientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.RationIngredient
        fields = '__all__'


class RationIngredientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.RationIngredient
        fields = ["ingredient_type",
                  "dm",
                  "me",
                  "cp",
                  "lys",
                  "meth",
                  "mc",
                  "ee",
                  "cf",
                  "ca",
                  "p",
                  "ratio_min",
                  "ratio_max"]


class RationSerializer_GET(serializers.ModelSerializer):
    ingredients = RationIngredientSerializer_GET(many=True)

    class Meta:
        model = models.Ration
        fields = ['name', 'ingredients']


class RationSerializer_POST(serializers.ModelSerializer):
    ingredients = RationIngredientSerializer_POST(many=True)

    class Meta:
        model = models.Ration
        fields = ['name', 'ingredients']

    def create(self, validated_data):
        ingredients = validated_data.pop('ingredients', None)
        instance = super().create(validated_data)
        print('----------------')
        print(instance)
        for ingredient in ingredients:
            ing = models.RationIngredient(ration=instance, **ingredient)
            ing.save()

        return instance
