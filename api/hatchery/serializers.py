from rest_framework import serializers

from . import models
from eggs.models import Egg
from breeds.serializers import BreedSerializer_SLUG

class HatcherySerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()
    class Meta:
        model = models.Hatchery
        fields = ['id', 'name', 'display_name', 'incubation_moved_date', 'hatch_date', 'breed', 'note']

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