from rest_framework import serializers

from . import models


class ContactSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = '__all__'
