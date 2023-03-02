from rest_framework import serializers

from breeds.models import BreedType


class BreedTypeSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = BreedType
        fields = '__all__'


class BreedTypeSerializer_Statics(serializers.ModelSerializer):
    chicken_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = BreedType
        fields = '__all__'
