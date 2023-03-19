from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response
from django.db.models import Count
from django.db.models import F

from . import serializers
from core.views import HistoryViewSet
from locations.models import Country, City, House, LayedPlace
from core.views import ModelFilterViewSet


class CountryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = Country
        fields = ['name']


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = serializers.CountrySerializer_GET_V1
    filterset_class = CountryFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CountryHistoryViewSet(HistoryViewSet):
    queryset = Country.history.all()
    serializer_class = serializers.CountryHistory


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = serializers.CitySerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class HouseViewSet(ModelFilterViewSet):
    queryset = House.objects.all()
    serializer_class = serializers.HouseSerializer_GET_V1
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def filters(self):
        queryset = self.filter_queryset(self.get_queryset())
        return {
            'farms': queryset.values('farm__name', 'farm__id').annotate(
                count=Count("pk", distinct=True), label=F('farm__name'), value=F('farm__id')),
        }


class LayedPlaceViewSet(viewsets.ModelViewSet):
    queryset = LayedPlace.objects.all()
    serializer_class = serializers.LayedPlaceSerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
