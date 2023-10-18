from rest_framework import serializers

from . import models
from eggs.models import Egg

class HatcherySerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Hatchery
        fields = '__all__'

class HatcherySerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Hatchery
        fields = '__all__'

# Hatchery -> Eggs
class HatcheryEggSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg
        fields = '__all__'

class HatcheryEggSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg
        fields = '__all__' 

class HatcheryEggSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg
        fields = '__all__'
    # def create(self, validated_data):
    #     hatchery = models.Formula.objects.get(
    #         pk=self.context["view"].kwargs["hatchery_pk"])
    #     egg = Egg.objects.get(
    #         pk=self.context["view"].kwargs["id"])
    #     validated_data['hatchery'] = hatchery
    #     validated_data['ingredient'] = ingredient
    #     return super().create(validated_data)