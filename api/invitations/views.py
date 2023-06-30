from django.shortcuts import render
from rest_framework import viewsets, status

from . import models
from . import serializers


class InvitationViewSet(viewsets.ModelViewSet):
    queryset = models.Invitation.objects.all()
    serializer_class = serializers.InvitationSerializer_GET
