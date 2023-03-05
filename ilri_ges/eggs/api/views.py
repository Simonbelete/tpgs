from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response

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
