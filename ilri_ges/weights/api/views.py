from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response

from . import serializers
from core.views import HistoryViewSet
from .. import models


class WeightFilter(filters.FilterSet):
    start_week = filters.CharFilter(field_name='week', lookup_expr='gte')
    end_week = filters.CharFilter(field_name='week', lookup_expr='lte')
    chicken = filters.CharFilter(field_name='chicken', lookup_expr='exact')

    class Meta:
        model = models.Weight
        fields = ['start_week', 'end_week', 'chicken']


class WeightViewSet(viewsets.ModelViewSet):
    queryset = models.Weight.objects.all()
    serializer_class = serializers.WeightSerializer_GET_V1
    filterset_class = WeightFilter
    search_fields = ['chicken__tag']
    ordering_fields = '__all__'


class WeightHistoryViewSet(HistoryViewSet):
    queryset = models.Weight.history.all()
    serializer_class = serializers.WeightHistory
