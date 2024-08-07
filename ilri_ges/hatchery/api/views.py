from rest_framework import viewsets, status
from django.db.models import Count, Sum
from rest_framework.response import Response
from django.http import Http404, HttpResponse
from core.views import ModelFilterViewSet
from django_filters import rest_framework as filters
from django.db.models import Count, Sum
from django.db.models import F

from .. import models
from . import serializers


class HatcheryViewSet(viewsets.ModelViewSet):
    queryset = models.Hatchery.objects.all()
    serializer_class = serializers.HatcherySerializer_GET
    ordering_fields = '__all__'


class IncubationViewSet(viewsets.ModelViewSet):
    queryset = models.Incubation.objects.all()
    serializer_class = serializers.IncubationSerializer_GET
    ordering_fields = '__all__'


class CandlingViewSet(viewsets.ModelViewSet):
    queryset = models.Candling.objects.all()
    serializer_class = serializers.CandlingSerializer_GET
    ordering_fields = '__all__'


class HatcheryIncubation(viewsets.ModelViewSet):
    queryset = models.Incubation.objects.all()
    serializer_class = serializers.IncubationSerializer_GET

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(
            hatchery=id).order_by('date_time'))

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})


class HatcheryCandling(viewsets.ModelViewSet):
    queryset = models.Candling.objects.all()
    serializer_class = serializers.CandlingSerializer_GET

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(
            hatchery=id).order_by('date'))

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})
