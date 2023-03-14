from rest_framework import viewsets
from django_filters import rest_framework as filters

from core.views import HistoryViewSet
from flocks.models import Flock
from . import serializers


class FlockFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = Flock
        fields = ['name', 'farm', 'is_active']


class FlockViewSet(viewsets.ModelViewSet):
    queryset = Flock.objects.all()
    serializer_class = serializers.FlockSerializer_GET_V1
    filterset_class = FlockFilter
    search_fields = ['name']
    ordering_fields = '__all__'


class FlockHistoryViewSet(HistoryViewSet):
    queryset = Flock.history.all()
    serializer_class = serializers.FlockHistory
    search_fields = ['name']
    ordering_fields = '__all__'
