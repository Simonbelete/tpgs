from rest_framework import serializers

from users.api.serializers import UserSerializer_GET_V1
from chickens.api.serializers import ChickenSerializer_GET_V1
from ..models import Egg


class EggSerializer_GET_V1(serializers.ModelSerializer):
    chicken = ChickenSerializer_GET_V1()

    class Meta:
        model = Egg
        fields = '__all__'


class ChickenEggSerializer(serializers.ModelSerializer):
    class Meta:
        model = Egg
        fields = '__all__'


class EggHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    chicken = ChickenSerializer_GET_V1()

    class Meta:
        model = Egg.history.__dict__['model']
        fields = '__all__'
