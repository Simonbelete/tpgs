from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'flocks', views.FlockViewSet,
                basename='api_flocks')

urlpatterns = [
    path('', include(router.urls)),
]
