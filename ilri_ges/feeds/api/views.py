from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response

from . import serializers
from core.views import HistoryViewSet
from .. import models

# Feed Types


class FeedTypeFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.FeedType
        fields = ['name']


class FeedTypeViewSet(viewsets.ModelViewSet):
    queryset = models.FeedType.objects.all()
    serializer_class = serializers.FeedTypeSerializer_GET_V1
    filterset_class = FeedTypeFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class FeedTypeHistoryViewSet(HistoryViewSet):
    queryset = models.FeedType.history.all()
    serializer_class = serializers.FeedTypeHistory

# Feed


class FeedFilter(filters.FilterSet):

    class Meta:
        model = models.Feed
        fields = ''


class FeedViewSet(viewsets.ModelViewSet):
    queryset = models.Feed.objects.all()
    serializer_class = serializers.FeedSerializer_GET_V1
    filterset_class = FeedFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class FeedHistoryViewSet(HistoryViewSet):
    queryset = models.Feed.history.all()
    serializer_class = serializers.FeedHistory
