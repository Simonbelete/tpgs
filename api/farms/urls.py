from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'farms', views.FarmViewSet, basename='api_farms'),

urlpatterns = [
    path('', include(router.urls))
]
