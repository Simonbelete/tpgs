from django.urls import include, path
from rest_framework import routers

from api.v1 import views

router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='countries')
router.register(r'cities', views.CityViewSet, basename='cities')
router.register(r'farms', views.FarmViewSet, basename='farms')
router.register(r'houses', views.HouseViewSet, basename='houses')
router.register(r'breed-types', views.BreedTypeViewSet, basename='breed_types')
router.register(r'stages', views.StageViewSet, basename='stages')

urlpatterns = [
    path('', include(router.urls))
]
