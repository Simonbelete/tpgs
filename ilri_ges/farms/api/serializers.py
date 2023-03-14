from rest_framework import serializers

from farms.models import Farm


class FarmSerializer_GET_V1(serializers.ModelSerializer):
    city = serializers.StringRelatedField()

    class Meta:
        model = Farm
        fields = ['id', 'name', 'city', 'chicken_count', 'created_at']
