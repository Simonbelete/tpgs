from rest_framework import serializers

from . import models
from breeds.serializers import BreedSerializer_SLUG
from eggs.models import Egg
from stages.serializers import StageSerializer_SLUG


class EggSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = Egg
        fields = ['id', 'display_name', 'display_available_eggs']


# Hatchery


class HatcherySerializer_SLUG(serializers.ModelSerializer):

    class Meta:
        model = models.Hatchery
        fields = ['id', 'name', 'display_name', 'hatchery_egg_count', 'incubation_count',
                  'total_egg_set', 'total_infertile_eggs', 'total_removed_eggs', 'total_hatched_egg']


class HatcherySerializer_GET(serializers.ModelSerializer):
    breed = BreedSerializer_SLUG()
    # stage = StageSerializer_SLUG()

    class Meta:
        model = models.Hatchery
        fields = ['id', 'name', 'display_name',  'hatchery_egg_count', 'incubation_count',
                  'incubation_moved_date', 'hatch_date', 'breed', 'note', 'is_active', 'created_at']


class HatcherySerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Hatchery
        fields = '__all__'


class HatcheryHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Hatchery.history.__dict__['model']
        fields = '__all__'


# Hatchery Egg


class HatcheryEggSerializer_GET(serializers.ModelSerializer):
    hatchery = HatcherySerializer_SLUG()
    egg = EggSerializer_SLUG()

    class Meta:
        model = models.HatcheryEgg
        fields = ['id', 'display_name', 'hatchery', 'egg', 'no_eggs', 'canndle_date', 'candled_eggs',
                  'infertile_egg', 'no_of_hatched', 'no_dead', 'no_culled', 'is_active', 'created_at']


class HatcheryEggSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg
        fields = ['hatchery', 'egg', 'no_eggs', 'canndle_date', 'candled_eggs', 'is_active',
                  'infertile_egg', 'no_of_hatched', 'no_dead', 'no_culled']

    def create(self, validated_data):
        if ('hatchery_pk' in self.context["view"].kwargs):
            hatchery = models.Hatchery.objects.get(
                pk=self.context["view"].kwargs["hatchery_pk"])
            validated_data['hatchery'] = hatchery
        return super().create(validated_data)


class HatcheryEggHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HatcheryEgg.history.__dict__['model']
        fields = '__all__'


# Incubations
class IncubationSerializer_GET(serializers.ModelSerializer):
    hatchery = HatcherySerializer_SLUG()

    class Meta:
        model = models.Incubation
        fields = ['id', 'display_name', 'hatchery', 'date_time', 'temperature_celsius',
                  'humidity_fahrenheit', 'humidity_percent', 'remark']


class IncubationSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Incubation
        fields = ['hatchery', 'date_time', 'temperature_celsius',
                  'humidity_fahrenheit', 'humidity_percent', 'remark']

    def create(self, validated_data):
        if ('hatchery_pk' in self.context["view"].kwargs):
            hatchery = models.Hatchery.objects.get(
                pk=self.context["view"].kwargs["hatchery_pk"])
            validated_data['hatchery'] = hatchery
        return super().create(validated_data)


class IncubationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Incubation.history.__dict__['model']
        fields = '__all__'
