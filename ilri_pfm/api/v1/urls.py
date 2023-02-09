from django.urls import include, path
from rest_framework import routers

from api.v1 import views

router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='countries')

urlpatterns = [
    path('', include(router.urls))
]
