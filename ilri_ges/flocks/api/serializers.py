from rest_framework import serializers

from users.api.serializers import UserSerializer_GET_V1
from chickens.api.serializers import ChickenSerializer_GET_V1
from farms.api.serializers import FarmSerializer_GET_V1
from breeds.api.serializers import BreedTypeSerializer_GET_V1
from flocks.models import Flock


class FlockSerializer_GET_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    farm = FarmSerializer_GET_V1()
    breed_type = BreedTypeSerializer_GET_V1()

    class Meta:
        model = Flock
        fields = ['id', 'name', 'breed_type',
                  'farm', 'chickens_count', 'created_at', 'is_active']


class FlockHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    farm = FarmSerializer_GET_V1()
    breed_type = BreedTypeSerializer_GET_V1()

    class Meta:
        model = Flock.history.__dict__['model']
        fields = '__all__'
