from rest_framework import serializers

from chickens.api.serializers import ChickenSerializer_GET_V1
from chickens.models import Chicken
from breeding_pairs.models import BreedPair


class BreedPairSerializer_GET_V1(serializers.ModelSerializer):
    sire = ChickenSerializer_GET_V1()
    dam = ChickenSerializer_GET_V1()

    class Meta:
        model = BreedPair
        fields = '__all__'


class BreedPairSerializer_POST_V1(serializers.ModelSerializer):
    father = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=Chicken.objects.all())
    mother = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=Chicken.objects.all())
    date = serializers.DateField()

    class Meta:
        model = BreedPair
        fields = ['father', 'mother', 'date']
