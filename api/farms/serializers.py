from rest_framework import serializers
from . import models


class FarmSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = ['id', 'name']


class FarmSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = ['id', 'name', 'display_name', 'tenant_name', 'tenant_uuid', 'phone_number', 'email',
                  'address', 'country', 'city']


class FarmSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = ['phone_number', 'email', 'tenant_name',
                  'address', 'country', 'city']
