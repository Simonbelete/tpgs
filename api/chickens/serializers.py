
from rest_framework import serializers

from . import models
from users.serializers import UserSerializer_GET
from flocks.serializers import FlockSerializer_SLUG
from houses.serializers import HouseSerializer_SLUG
from reduction_reason.models import ReductionReason

class ChickenSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = ['id', 'name']

class ChickenSerializer_GET(serializers.ModelSerializer):
    sire = ChickenSerializer_SLUG()
    dam = ChickenSerializer_SLUG()
    flock = FlockSerializer_SLUG()
    house = HouseSerializer_SLUG()

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

class ChickenBatchReductionSerializer_POST(serializers.Serializer):
    chickens = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Chicken.all.all())
    reduction_reason = serializers.PrimaryKeyRelatedField(queryset=ReductionReason.objects.all())
    reduction_date = serializers.DateField()
    class Meta:
        model = models.Chicken
        fields = ['chickens', 'reduction_reason', 'reduction_date']
