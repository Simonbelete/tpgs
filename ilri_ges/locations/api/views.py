from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response

from . import serializers
from core.views import HistoryViewSet
from locations.models import Country, City, House, LayedPlace


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


class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = serializers.HouseSerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class LayedPlaceViewSet(viewsets.ModelViewSet):
    queryset = LayedPlace.objects.all()
    serializer_class = serializers.LayedPlaceSerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
