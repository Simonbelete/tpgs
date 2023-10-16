from rest_framework import serializers

from users.serializers import UserSerializer_SLUG
from . import models

class ReductionReasonSerializer_SLUG(serializers.ModelSerializer):
    class Meta:
        model = models.ReductionReason
        fields = ['id', 'name']

class ReductionReasonSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = models.ReductionReason
        fields = ['id', 'name', 'is_active']


class ReductionReasonHistorySerializer(serializers.ModelSerializer):
    history_user = UserSerializer_SLUG()

    class Meta:
        model = models.ReductionReason.history.__dict__['model']
        fields = '__all__'
