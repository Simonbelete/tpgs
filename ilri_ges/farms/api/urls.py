from django.urls import include, path
from rest_framework import routers

from .views import FarmViewSet

router = routers.DefaultRouter()
router.register(r'farms', FarmViewSet,
                basename='api_farms')

urlpatterns = [
    path('', include(router.urls)),
]
