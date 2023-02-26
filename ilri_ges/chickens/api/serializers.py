from rest_framework import serializers

from chickens.models import Chicken


class ChickenSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = '__all__'
