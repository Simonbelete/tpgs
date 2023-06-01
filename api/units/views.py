from django.shortcuts import render
from rest_framework import viewsets, status
from . import models
from . import serializers


class UnitConverterViewSet(viewsets.ModelViewSet):
    queryset = models.UnitConverter.objects.all()
    serializer_class = serializers.UnitConverterSerializer_GET


class UnitViewSet(viewsets.ModelViewSet):
    queryset = models.Unit.objects.all()
    serializer_class = serializers.UnitSerializer_GET
