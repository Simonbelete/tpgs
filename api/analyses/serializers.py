
from rest_framework import serializers

from . import models
from chickens.models import Chicken
from chickens.serializers import ChickenSerializer_SLUG, ChickenSerializer_GET


class DirectoryListSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.DirectoryList
        fields = ['name', 'unique_id', 'farm_name',
                  'farm_id', 'hatchery_id', 'hatchery_name',
                  'house_id', 'house_name', 'pen_id', 'pen_name',
                  'breed_name', 'breed_id',
                  'display_name', 'batch_name', 'generation']


class PedigreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ['id', 'tag', 'sex', 'parents']


class ChickenRecordSetSerializer(serializers.ModelSerializer):
    chicken = ChickenSerializer_GET()

    class Meta:
        model = models.ChickenRecordset
        fields = '__all__'