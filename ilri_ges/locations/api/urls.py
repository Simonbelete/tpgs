from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='api_countries'),
router.register(r'countries/(?P<id>.+)/histories',
                views.CountryHistoryViewSet, basename='api_country_histories'),
router.register(r'cities', views.CityViewSet, basename='api_cities'),
router.register(r'houses', views.HouseViewSet, basename='api_houses'),
router.register(r'layed-places', views.LayedPlaceViewSet,
                basename='api_layed_places'),

urlpatterns = [
    path('', include(router.urls)),
]
