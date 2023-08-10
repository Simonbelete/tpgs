from rest_framework import serializers

from . import models
from users.serializers import UserSerializer_GET


class InvitationSerializer_GET(serializers.ModelSerializer):
    inviter = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    farms = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

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
