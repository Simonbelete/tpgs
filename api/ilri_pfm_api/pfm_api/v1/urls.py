from django.urls import path, include
from rest_framework import routers

from pfm_api.v1.views import UserViewSet, DeviceViewSet, UserUidViewSet, FarmViewSet, ChickenViewSet, ChickenParentViewSet, BreedTypeParentViewSet, ChickenStageParentViewSet, EggParentViewSet, LayedPlaceViewSet, ChickenGrowthViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'users/uid', UserUidViewSet)
router.register(r'users/devices', DeviceViewSet)
router.register(r'farms', FarmViewSet)
router.register(r'chickens', ChickenViewSet)
router.register(r'chicken-growths', ChickenGrowthViewSet)
router.register(r'chickens/parents', ChickenParentViewSet)
router.register(r'breed-types', BreedTypeParentViewSet)
router.register(r'chicken-stages', ChickenStageParentViewSet)
router.register(r'eggs', EggParentViewSet)
router.register(r'layed-places', LayedPlaceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
