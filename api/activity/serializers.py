from rest_framework import serializers
from django.contrib.admin.models import LogEntry
from django.contrib.contenttypes.models import ContentType

from users.serializers import UserSerializer_SLUG


class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = ['app_label', 'model']

class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer_SLUG()
    content_type = ContentTypeSerializer()

    class Meta:
        model = LogEntry
        fields = ['id', '__str__', 'action_time',
                  'user', 'content_type', 'object_id', 'object_repr', 'action_flag', 'change_message',  '__repr__']
