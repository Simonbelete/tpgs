from rest_framework import serializers

from chickens.models import Chicken
from users.api.serializers import UserSerializer_GET_V1
from locations.api.serializers import HouseSerializer_GET_V1
from farms.api.serializers import FarmSerializer_GET_V1
from breeds.api.serializers import BreedTypeSerializer_GET_V1
from breeding_pairs.models import BreedPair


class ChickenSerializer_GET_V1(serializers.ModelSerializer):
    breed_type = BreedTypeSerializer_GET_V1()
    farm = FarmSerializer_GET_V1()
    house = HouseSerializer_GET_V1()

    class Meta:
        model = Chicken
        fields = ['name', 'age', 'age_in_days', 'age_in_weeks', 'hatch_weight', 'flock', 'id', 'tag', 'sex', 'farm', 'breed_pair',
                  'house', 'breed_type', 'layed_place', 'is_double_yolk', 'hatch_date', 'days_alive', 'dead_date', 'is_active', 'created_at']


class ChickenSireDamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ['name', 'tag']


class BreedPairSireDamSerializer(serializers.ModelSerializer):
    sire = ChickenSireDamSerializer()
    dam = ChickenSireDamSerializer()

    class Meta:
        model = BreedPair
        fields = ['id', 'date', 'sire', 'dam']


class ChickenSerializerOffsprings_GET_V1(serializers.ModelSerializer):
    breed_pair = BreedPairSireDamSerializer()

    class Meta:
        model = Chicken
        fields = ["id", "breed_pair", 'name', 'age', 'age_in_days',
                  'age_in_weeks', 'tag', 'sex']


class ChickenHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    house = HouseSerializer_GET_V1()
    farm = FarmSerializer_GET_V1()
    breed_type = BreedTypeSerializer_GET_V1()

    class Meta:
        model = Chicken.history.__dict__['model']
        fields = '__all__'
