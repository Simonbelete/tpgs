from rest_framework import serializers

from . import models


class InvitationSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Invitation
        fields = '__all__'
