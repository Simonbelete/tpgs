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


class IngredientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = ['name', 'code',
                  'description', 'price', 'price_unit']


class IngredientNutrientSerializer_REF_POST(serializers.Serializer):
    nutrient = serializers.PrimaryKeyRelatedField(
        queryset=Nutrient.objects.all())
    value = serializers.FloatField()


# class IngredientSerializer_POST(serializers.ModelSerializer):
#     nutrients = IngredientNutrientSerializer_POST(many=True)

#     class Meta:
#         model = models.Ingredient
#         fields = ['name', 'code',
#                   'description', 'price', 'price_unit', 'nutrients']

#     # def create(self, validated_data):
#     #     nutrients = validated_data.pop('nutrients', None)
#     #     instance = models.Ingredient.objects.create(**validated_data)
#     #     for nutrient in nutrients:
#     #         models.IngredientNutrient.objects.create(
#     #             ingredient=instance, nutrient=nutrient['nutrient'], value=nutrient['value'])
#     #     return instance

#     def update(self, instance, validated_data):
#         # print('-------------')
#         # print('update')
#         # nutrients_data = validated_data.pop('nutrients', [])
#         # nutrients = instance.nutrients

#         # instance.name = validated_data.get('name', instance.name)
#         # instance.save()

#         # nutrients_ids = []
#         # for nu in nutrients_data:
#         #     print('=====================================')
#         #     print(nu)
#         #     nu_i, created = models.IngredientNutrient.objects.update_or_create(
#         #         pk=nu.get('id'), defaults={**nu, "ingredient": instance})
#         #     nutrients_ids.append(nu_i.pk)
#         # print(nutrients_ids)
#         # nutrients.set(nutrients_ids)

#         return instance


# Ingredient -> Nutrients

class IngredientNutrientSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient
        fields = '__all__'


class IngredientNutrientSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient
        fields = ['nutrient', 'value']

    def create(self, validated_data):
        ingredient = models.Ingredient.objects.get(
            pk=self.context["view"].kwargs["ingredient_pk"])
        validated_data['ingredient'] = ingredient
        return super().create(validated_data)


class IngredientNutrientSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.IngredientNutrient
        fields = ['value']

    def create(self, validated_data):
        print('--------------------')
        ingredient = models.Ingredient.objects.get(
            pk=self.context["view"].kwargs["ingredient_pk"])
        nutrient = Nutrient.objects.get(
            pk=self.context["view"].kwargs["id"])
        validated_data['ingredient'] = ingredient
        validated_data['nutrient'] = nutrient
        return super().create(validated_data)
