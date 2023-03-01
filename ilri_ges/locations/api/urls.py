from django.urls import include, path
from rest_framework import routers

from .views import CountryViewSet, CityViewSet, HouseViewSet, LayedPlaceViewSet

router = routers.DefaultRouter()
router.register(r'countries', CountryViewSet, basename='api_countries'),
router.register(r'cities', CityViewSet, basename='api_cities'),
router.register(r'houses', HouseViewSet, basename='api_houses'),
router.register(r'layed-places', LayedPlaceViewSet,
                basename='api_layed_places'),

urlpatterns = [
    path('', include(router.urls)),
]
