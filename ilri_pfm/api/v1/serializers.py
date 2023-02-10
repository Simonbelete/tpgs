from rest_framework import serializers

import api.models as models

############################ Country ############################


class CountrySerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = '__all__'


class CountrySerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = models.Country
        fields = ['name']


############################ City ############################

class CitySerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.City
        fields = '__all__'


class CitySerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    country = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Country.objects.all())

    class Meta:
        model = models.City
        fields = ['name', 'country']


############################ Farm ############################

class FarmSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = '__all__'


class FarmSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    city = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.City.objects.all())
    is_active = serializers.BooleanField()

    class Meta:
        model = models.Farm
        fields = ['name', 'city', 'is_active']


############################ House ############################

class HouseSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.House
        fields = '__all__'


class HouseSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    farm = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Farm.objects.all())
    is_active = serializers.BooleanField()

    class Meta:
        model = models.House
        fields = ['name', 'farm', 'is_active']


############################ Breed Type ############################

class BreedTypeSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.BreedType
        fields = '__all__'


class BreedTypeSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    color = serializers.CharField()
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = models.BreedType
        fields = ['name', 'color', 'is_active']
