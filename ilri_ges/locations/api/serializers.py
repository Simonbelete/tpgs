from rest_framework import serializers

from locations.models import Country, City, LayedPlace, House


class CountrySerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = Country
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
    class Meta:
        model = House
        fields = '__all__'
