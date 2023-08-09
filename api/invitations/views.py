from django.shortcuts import render
from rest_framework import viewsets, status

from . import models
from . import serializers


class InvitationViewSet(viewsets.ModelViewSet):
    queryset = models.Invitation.objects.all()
    serializer_class = serializers.InvitationSerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.InvitationSerializer_POST
        return serializers.InvitationSerializer_GET

    def perform_create(self, serializer):
        serializer.save(inviter=self.request.user)
