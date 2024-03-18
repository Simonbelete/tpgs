from rest_framework import serializers
from django.contrib.admin.models import LogEntry

from users.serializers import UserSerializer_SLUG


class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer_SLUG()

    class Meta:
        model = LogEntry
        fields = ['id', '__str__', 'action_time',
                  'user', 'content_type', 'object_id', 'object_repr', 'action_flag', 'change_message',  '__repr__']
