from rest_framework import serializers

from . import models
from eggs.models import Egg
from breeds.serializers import BreedSerializer_SLUG

## Hatchery
class HatcherySerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()
    class Meta:
        model = models.Hatchery
        fields = ['id', 'name', 'display_name', 'incubation_moved_date', 'hatch_date', 'breed', 'note']

class HatcherySerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Hatchery
        fields = '__all__'

## Hatchery -> Eggs
class HatcheryEggSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg
        fields = '__all__'
        
class HatcheryEggSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg
        fields = ['egg', 'no_eggs', 'canndle_date', 'candled_eggs',
                  'infertile_egg', 'no_of_hatched', 'no_dead', 'no_culled']

    def create(self, validated_data):
        hatchery = models.Hatchery.objects.get(
            pk=self.context["view"].kwargs["hatchery_pk"])
        validated_data['hatchery'] = hatchery
        return super().create(validated_data)
    
class HatcheryEggSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg
        fields = '__all__'

    def create(self, validated_data):
        hatchery = models.Hatchery.objects.get(
            pk=self.context["view"].kwargs["hatchery_pk"])
        egg = Egg.objects.get(
            pk=self.context["view"].kwargs["id"])
        validated_data['hatchery'] = hatchery
        validated_data['egg'] = egg
        return super().create(validated_data)
    
    
## Incubations
class IncubationSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Incubation
        fields = ['hatchery', 'date_time', 'temperature_celsius', 'humidity_fahrenheit', 'humidity_percent', 'remark']

class IncubationSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Incubation
        fields = '__all__'
        
        
## Hatchery -> Incubation
class HatcheryIncubationSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Incubation
        fields = '__all__'
        
class HatcheryIncubationSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Incubation
        fields = ['hatchery', 'date_time', 'temperature_celsius', 'humidity_fahrenheit', 'humidity_percent', 'remark']

    def create(self, validated_data):
        hatchery = models.Hatchery.objects.get(
            pk=self.context["view"].kwargs["hatchery_pk"])
        validated_data['hatchery'] = hatchery
        return super().create(validated_data)
    
class HatcheryIncubationSerializer_PATCH(serializers.ModelSerializer):
    class Meta:
        model = models.Incubation
        fields = '__all__'

    def create(self, validated_data):
        hatchery = models.Hatchery.objects.get(
            pk=self.context["view"].kwargs["hatchery_pk"])
        egg = Egg.objects.get(
            pk=self.context["view"].kwargs["id"])
        validated_data['hatchery'] = hatchery
        validated_data['egg'] = egg
        return super().create(validated_data)