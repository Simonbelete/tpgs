
from rest_framework import serializers

from . import models
from users.serializers import UserSerializer_GET

class ChickenSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = ['id', 'name']

class ChickenSerializer_GET(serializers.ModelSerializer):
    sire = ChickenSerializer_SLUG()
    dam = ChickenSerializer_SLUG()
    class Meta:
        model = models.Chicken
        fields = ['id', 'name', 'tag', 'sex', 'sire', 'dam', 'flock', 'house', 'pen', 
            'reduction_date', 'reduction_reason']


class ChickenSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = '__all__'
        # fields = ['tag', 'tag', 'sex', 'sire', 'dam', 'flock', 'house', 'pen', 
        #     'reduction_date', 'reduction_reason']


class ChickenHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_GET()

    class Meta:
        model = models.Chicken.history.__dict__['model']
        fields = '__all__'
