from rest_framework import serializers
from notifications.models import Notification


class NotificationSerializer_GET(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'public',
                  'level', 'unread', 'verb', 'description', 'timestamp']
