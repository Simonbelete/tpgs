from rest_framework import serializers
from . import models


class FarmSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = ['id', 'name']


class FarmSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = ['id', 'name', 'display_name', 'tenant_name', 'tenant_uuid']


class FarmSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = ['phone_number', 'email',
                  'webiste', 'address', 'country', 'city']
