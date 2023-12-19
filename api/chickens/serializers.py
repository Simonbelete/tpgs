
from rest_framework import serializers

from . import models
from users.serializers import UserSerializer_GET
from hatchery.serializers import HatcherySerializer_SLUG
from pen.serializers import PenSerializer_SLUG
from reduction_reason.models import ReductionReason
from breeds.serializers import BreedSerializer_SLUG
from reduction_reason.serializers import ReductionReasonSerializer_SLUG


class ChickenSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = ['id', 'display_name']


class ChickenSerializer_GET(serializers.ModelSerializer):
    sire = ChickenSerializer_SLUG()
    dam = ChickenSerializer_SLUG()
    hatchery = HatcherySerializer_SLUG()
    pen = PenSerializer_SLUG()
    breed = BreedSerializer_SLUG()
    reduction_reason = ReductionReasonSerializer_SLUG()

    class Meta:
        model = models.Chicken
        fields = ['id', 'display_name', 'tag', 'breed', 'sex', 'sire', 'dam', 'hatchery', 'pen', 'hatch_date',
                  'reduction_date', 'reduction_reason']


class ChickenSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex', 'sire', 'dam', 'hatchery', 'pen',
                  'reduction_date', 'reduction_reason', 'generation']


class ChickenHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_GET()

    class Meta:
        model = models.Chicken.history.__dict__['model']
        fields = '__all__'


class GenerationSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Chicken
        fields = ['generation']
