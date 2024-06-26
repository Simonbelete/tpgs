"""
Couple djangorestframework and cities_light.

It defines a urlpatterns variables, with the following urls:

- cities-light-api-city-list
- cities-light-api-city-detail
- cities-light-api-region-list
- cities-light-api-region-detail
- cities-light-api-country-list
- cities-light-api-country-detail

If rest_framework (v3) is installed, all you have to do is add this url
include::

    path('cities_light/api/',
         include('cities_light.contrib.restframework3')),

And that's all !
"""
from django.urls import include, path
from rest_framework import viewsets, relations
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from rest_framework import routers

from cities_light.loading import get_cities_models

Country, Region, SubRegion, City = get_cities_models()


class CitySerializer(ModelSerializer):
    """
    HyperlinkedModelSerializer for City.
    """
    country = relations.SlugRelatedField(read_only=True,
        slug_field='name')
    region = relations.SlugRelatedField(read_only=True,
        slug_field='name')
    subregion = relations.SlugRelatedField(read_only=True,
        slug_field='name')

    class Meta:
        model = City
        fields =['id', 'name', 'country', 'region', 'subregion', 'latitude', 'longitude']


class SubRegionSerializer(ModelSerializer):
    """
    HyperlinkedModelSerializer for SubRegion.
    """
    country = relations.SlugRelatedField(read_only=True,
        slug_field='name')
    region = relations.SlugRelatedField(read_only=True,
        slug_field='name')
    
    class Meta:
        model = SubRegion
        fields = ['id', 'name', 'country', 'region']


class RegionSerializer(ModelSerializer):
    country = relations.SlugRelatedField(read_only=True,
        slug_field='name')
    class Meta:
        model = Region
        fields = ['id', 'name', 'display_name', 'country']


class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'code2', 'code3']


class CitiesLightListModelViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        """
        Allows a GET param, 'q', to be used against name_ascii.
        """
        queryset = super().get_queryset()

        if self.request.GET.get('search', None):
            return queryset.filter(name_ascii__icontains=self.request.GET['search'])

        return queryset


class CountryModelViewSet(CitiesLightListModelViewSet):
    serializer_class = CountrySerializer
    queryset = Country.objects.all()


class RegionModelViewSet(CitiesLightListModelViewSet):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()


class SubRegionModelViewSet(CitiesLightListModelViewSet):
    serializer_class = SubRegionSerializer
    queryset = SubRegion.objects.all()


class CityModelViewSet(CitiesLightListModelViewSet):
    """
    ListRetrieveView for City.
    """
    serializer_class = CitySerializer
    queryset = City.objects.all()

    def get_queryset(self):
        """
        Allows a GET param, 'q', to be used against search_names.
        """
        queryset = self.queryset

        if self.request.GET.get('q', None):
            return queryset.filter(
                search_names__icontains=self.request.GET['q'])

        return queryset


router = routers.SimpleRouter()
router.register(r'cities', CityModelViewSet, basename='city_cities-light-api-city')
router.register(r'countries', CountryModelViewSet,
                basename='city_cities-light-api-country')
router.register(r'regions', RegionModelViewSet,
                basename='city_cities-light-api-region')
router.register(r'subregions', SubRegionModelViewSet,
                basename='city_cities-light-api-subregion')

urlpatterns = [
    path('', include(router.urls)),
]
