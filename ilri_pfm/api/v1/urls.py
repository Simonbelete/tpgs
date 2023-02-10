from django.urls import include, path
from rest_framework import routers

from api.v1 import views

router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='countries')
router.register(r'cities', views.CityViewSet, basename='cities')
router.register(r'farms', views.FarmViewSet, basename='farms')

urlpatterns = [
    path('', include(router.urls))
]
