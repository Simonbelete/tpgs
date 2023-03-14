from rest_framework import serializers

from chickens.api.serializers import ChickenSerializer_GET_V1
from users.api.serializers import UserSerializer_GET_V1
from chickens.models import Chicken
from breeding_pairs.models import BreedPair


class BreedPairSerializer_GET_V1(serializers.ModelSerializer):
    sire = ChickenSerializer_GET_V1()
    dam = ChickenSerializer_GET_V1()

    class Meta:
        model = BreedPair
        fields = ['id', 'date', 'sire', 'dam',
                  'children', 'children_count', 'created_at']


class BreedPairSerializer_POST_V1(serializers.ModelSerializer):
    father = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=Chicken.objects.all())
    mother = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=Chicken.objects.all())
    date = serializers.DateField()

    class Meta:
        model = BreedPair
        fields = ['father', 'mother', 'date']


class BreedPairHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    sire = ChickenSerializer_GET_V1()
    dam = ChickenSerializer_GET_V1()

    class Meta:
        model = BreedPair.history.__dict__['model']
        fields = '__all__'
