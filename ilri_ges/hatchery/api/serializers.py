from rest_framework import serializers
from hatchery.models import Hatchery, Incubation, Candling


class HatcherySerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = Hatchery
        fields = '__all__'


class IncubationSerializer_GET(serializers.ModelSerializer):
    hatchery = HatcherySerializer_GET()

    class Meta:
        model = Incubation
        fields = '__all__'


class CandlingSerializer_GET(serializers.ModelSerializer):
    hatchery = HatcherySerializer_GET()

    class Meta:
        model = Candling
        fields = '__all__'
