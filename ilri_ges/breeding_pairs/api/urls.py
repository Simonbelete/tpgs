from django.urls import include, path
from rest_framework import routers

from .views import BreedPairViewSet, BreedPairTreeViewSet, BreedPairHistoryViewSet

router = routers.DefaultRouter()
router.register(r'breeding-pairs', BreedPairViewSet,
                basename='api_breeding_pairs')
router.register(r'breeding-pairs/(?P<id>.+)/histories',
                BreedPairHistoryViewSet, basename='api_breeding_pairs_histories'),
router.register(r'pairs/tree', BreedPairTreeViewSet,
                basename='api_breeding_pairs_tree')

urlpatterns = [
    path('', include(router.urls)),
]
