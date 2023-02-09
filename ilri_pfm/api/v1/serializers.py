from rest_framework import serializers

from api import models


class CountrySerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = '__all__'
