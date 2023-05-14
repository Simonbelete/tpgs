from rest_framework import serializers
from . import models

class FarmSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = '__all__' 