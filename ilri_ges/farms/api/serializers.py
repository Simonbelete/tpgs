from rest_framework import serializers

from farms.models import Farm


class FarmSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = '__all__'
