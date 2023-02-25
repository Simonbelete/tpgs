from rest_framework import serializers

from breeds.models import BreedType


class BreedTypeSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = BreedType
        fields = '__all__'
