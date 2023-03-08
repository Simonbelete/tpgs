from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from core.views import HistoryViewSet
from .. import models


class EggFilter(filters.FilterSet):
    class Meta:
        model = models.Egg
        fields = ''


class EggViewSet(viewsets.ModelViewSet):
    queryset = models.Egg.objects.all()
    serializer_class = serializers.EggSerializer_GET_V1
    filterset_class = EggFilter
    search_fields = ['chicken']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EggHistoryViewSet(HistoryViewSet):
    queryset = models.Egg.history.all()
    serializer_class = serializers.EggHistory


class HHEP(APIView):
    queryset = models.Egg.objects.all()

    def get(self, request):
        start_week = request.GET.get('start_week') or 0
        end_week = request.GET.get('end_week') or 0
        measurement = request.GET.get('measurement') or 'daily'
        # chicken, flock, breed
        group = request.GET.get('group') or 'chicken'
        chickens = request.GET.get('chicken') or ""
        flocks = request.GET.get('flock') or ""
        breeds = request.GET.get('breeds') or ""

        chickens = chickens.split(',') or []
        flocks = flocks.split(',') or []
        breeds = breeds.split(',') or []

        start_week = int(start_week)
        end_week = int(end_week)

        for week in range(start_week, end_week + 1):
            pass
