from rest_framework import serializers

from . import models


class InvitationSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.Invitation
        fields = '__all__'


class InvitationSerializer_POST(serializers.ModelSerializer):
    class Meta:
        model = models.Invitation
        fields = ['email', 'farms']


class VerifyInvitationSerializer_POST(serializers.Serializer):
    password = serializers.CharField()
    name = serializers.CharField()
    token = serializers.CharField()
