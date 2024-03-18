from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.admin.models import LogEntry

from . import serializers


class ActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LogEntry.objects.all()
    serializer_class = serializers.ActivitySerializer
