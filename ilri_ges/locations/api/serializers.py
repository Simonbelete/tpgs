from rest_framework import serializers

from locations.models import Country, City, LayedPlace, House
from users.api.serializers import UserSerializer_GET_V1
from farms.api.serializers import FarmSerializer_GET_V1


class CountrySerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class CountryHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    name = serializers.CharField()

    class Meta:
        model = Country.history.__dict__['model']
        fields = '__all__'


class CitySerializer_GET_V1(serializers.ModelSerializer):
    country = CountrySerializer_GET_V1()

    class Meta:
        model = City
        fields = '__all__'


class LayedPlaceSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = LayedPlace
        fields = '__all__'


class HouseSerializer_GET_V1(serializers.ModelSerializer):
    farm = FarmSerializer_GET_V1()

    class Meta:
        model = House
        fields = '__all__'
