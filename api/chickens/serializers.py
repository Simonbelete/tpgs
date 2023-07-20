
from rest_framework import serializers

from . import models
from users.serializers import UserSerializer_GET


class ChickenSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = '__all__'


class ChickenSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = '__all__'


class ChickenHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_GET()

    class Meta:
        model = models.Chicken.history.__dict__['model']
        fields = '__all__'
