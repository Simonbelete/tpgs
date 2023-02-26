from django.urls import include, path
from rest_framework import routers

from chickens.api.views import ChickenViewSet

router = routers.DefaultRouter()
router.register(r'chickens', ChickenViewSet, basename='api_chickens')

urlpatterns = [
    path('', include(router.urls)),
]
