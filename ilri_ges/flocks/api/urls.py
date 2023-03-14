from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'flocks', views.FlockViewSet, basename='api_flocks')
router.register(r'flocks/(?P<id>.+)/histories',
                views.FlockHistoryViewSet, basename='api_flocks_histories')

urlpatterns = [
    path('', include(router.urls)),
]
