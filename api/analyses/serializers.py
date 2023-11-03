
from rest_framework import serializers

from . import models
from chickens.models import Chicken


class DirectoryListSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.DirectoryList
        fields = ['name', 'unique_id', 'farm_name',
                  'farm_id', 'hatchery_id', 'hatchery_name',
                  'house_id', 'house_name', 'pen_id', 'pen_name',
                  'display_name', 'batch_name']


class PedigreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chicken
        fields = ['id', 'name', 'tag', 'sex']
