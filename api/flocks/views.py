from django.shortcuts import render
from rest_framework import viewsets, status

from . import models
from . import serializers


class FlockViewSet(viewsets.ModelViewSet):
    queryset = models.Flock.objects.all()
    serializer_class = serializers.FlockSerializer_GET
