from django.views.decorators.cache import never_cache
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, mixins

from . import serializers

class LiveUnreadNotificationList(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.NotificationSerializer_GET

    def get_queryset(self):
        return self.request.user.notifications.unread()
    
   
class LiveAllNotificationCount(APIView):
    def get(self, request):
        user_is_authenticated = request.user.is_authenticated
        if not user_is_authenticated:
            data = {
                'all_count': 0
            }
        else:
            data = {
                'all_count': request.user.notifications.count(),
            }
        return Response(data)

class LiveUnreadNotificationCount(APIView):
    def get(self, request):
        user_is_authenticated = request.user.is_authenticated
        if not user_is_authenticated:
            data = {
                'unread_count': 0
            }
        else:
            data = {
                'unread_count': request.user.notifications.unread().count(),
            }
        return Response(data)