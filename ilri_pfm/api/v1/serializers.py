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
