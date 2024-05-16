
from rest_framework import serializers

from . import models
from users.serializers import UserSerializer_GET
from hatchery.serializers import HatcherySerializer_SLUG
from pen.serializers import PenSerializer_SLUG
from houses.serializers import HouseSerializer_SLUG
from reduction_reason.models import ReductionReason
from breeds.serializers import BreedSerializer_SLUG
from reduction_reason.serializers import ReductionReasonSerializer_SLUG
from rest_framework.exceptions import ValidationError


class ChickenSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = ['id', 'display_name', 'tag']


class ChickenSerializer_GET(serializers.ModelSerializer):
    sire = ChickenSerializer_SLUG()
    dam = ChickenSerializer_SLUG()
    hatchery = HatcherySerializer_SLUG()
    pen = PenSerializer_SLUG()
    house = HouseSerializer_SLUG()
    breed = BreedSerializer_SLUG()
    reduction_reason = ReductionReasonSerializer_SLUG()

    class Meta:
        model = models.Chicken
        fields = ['id', 'display_name', 'tag', 'breed', 'sex', 'sire', 'dam', 'hatchery', 'pen', 'house', 'hatch_date', 'age_in_days', 'age_in_weeks', 'generation',
                  'reduction_date', 'reduction_reason', 'reduction_in_weeks', 'is_active', 'created_at', 'color']


class ChickenSerializer_POST(serializers.ModelSerializer):
    def validate(self, attrs):
        if(attrs['generation'] < 0):
            raise ValidationError({
                'generation': ['Generation cannot be negitive']
            })
        return attrs
    
    class Meta:
        model = models.Chicken
        fields = ['id', 'display_name', 'tag', 'sex', 'sire', 'dam', 'hatchery', 'pen', 'hatch_date', 'is_active',
                  'reduction_date', 'reduction_reason', 'generation', 'color']
        extra_kwargs = {
            'generation': {'required': True},
            'breed': {'required': True},
            'hatch_date': {'required': True}
        }


class ChickenHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_GET()

    class Meta:
        model = models.Chicken.history.__dict__['model']
        fields = '__all__'


#
# Distinict Values
class ChickenUniqueSerializer_GET(serializers.ModelSerializer):
    id = serializers.CharField()
    class Meta:
        model = models.Chicken
        # fields = '__all__'
        exclude = ('tag', )
