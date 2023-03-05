from rest_framework import serializers

from weights.models import Weight
from users.api.serializers import UserSerializer_GET_V1
from chickens.api.serializers import ChickenSerializer_GET_V1


class WeightSerializer_GET_V1(serializers.ModelSerializer):
    chicken = ChickenSerializer_GET_V1()

    class Meta:
        model = Weight
        fields = '__all__'


class WeightHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    chicken = ChickenSerializer_GET_V1()

    class Meta:
        model = Weight.history.__dict__['model']
        fields = '__all__'
