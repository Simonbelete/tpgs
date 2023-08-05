
from rest_framework import serializers

from . import models


class DirectoryListSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.DirectoryList
        fields = '__all__'
