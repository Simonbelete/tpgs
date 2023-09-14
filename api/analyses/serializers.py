
from rest_framework import serializers

from . import models


class DirectoryListSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.DirectoryList
        fields = ['name', 'unique_id', 'farm_name', 'farm_id', 'flock_id', 'flock_name', 'house_id', 'house_name']
