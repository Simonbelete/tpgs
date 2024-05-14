from django.views.decorators.cache import never_cache
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, mixins
from swapper import load_model
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from . import serializers


class LiveAllNotificationList(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.NotificationSerializer_GET
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.notifications.all()


class LiveUnreadNotificationList(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.NotificationSerializer_GET
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.notifications.unread()


class LiveAllNotificationCount(APIView):
    permission_classes = [IsAuthenticated]
    
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
    permission_classes = [IsAuthenticated]
    
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


class MarkAllAsRead(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            request.user.notifications.mark_all_as_read()
            return Response({}, status=201)
        except Exception as ex:
            return Response({}, status=500)


class MarkAsRead(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def create(self, request,  id=None):
        try:
            Notification = load_model('notifications', 'Notification')

            notification = get_object_or_404(
                Notification, recipient=request.user, id=id)
            notification.mark_as_read()
            return Response({}, status=200)
        except Exception as ex:
            return Response({}, status=500)
