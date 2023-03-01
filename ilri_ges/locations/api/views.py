from rest_framework import viewsets, status
from django_filters import rest_framework as filters

from .serializers import CountrySerializer_GET_V1, CitySerializer_GET_V1, LayedPlaceSerializer_GET_V1, HouseSerializer_GET_V1
from locations.models import Country, City, House, LayedPlace


class CountryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = Country
        fields = ['name']


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer_GET_V1
    filterset_class = CountryFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class LayedPlaceViewSet(viewsets.ModelViewSet):
    queryset = LayedPlace.objects.all()
    serializer_class = LayedPlaceSerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
