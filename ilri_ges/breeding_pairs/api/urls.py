from django.urls import include, path
from rest_framework import routers

from .views import BreedPairViewSet

router = routers.DefaultRouter()
router.register(r'breeding-pairs', BreedPairViewSet,
                basename='api_breeding_pairs')

urlpatterns = [
    path('', include(router.urls)),
]
