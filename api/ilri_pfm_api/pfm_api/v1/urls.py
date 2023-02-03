from django.urls import path, include
from rest_framework import routers

import pfm_api.v1.views as V1ViewSets

router = routers.DefaultRouter()
router.register(r'users', V1ViewSets.UserViewSet)
router.register(r'users/uid', V1ViewSets.UserUidViewSet)
router.register(r'users/devices', V1ViewSets.DeviceViewSet)
router.register(r'farms', V1ViewSets.FarmViewSet)
router.register(r'chickens', V1ViewSets.ChickenViewSet)
router.register(r'chickens/(?P<chicken_pk>.+)/growth/all', V1ViewSets.AllChickenGrowthViewSet)
router.register(r'chicken-growths', V1ViewSets.ChickenGrowthViewSet)
router.register(r'chickens/parents', V1ViewSets.ChickenParentViewSet)
router.register(r'breed-types', V1ViewSets.BreedTypeParentViewSet)
router.register(r'breed-types/report/chicken-percentage', V1ViewSets.BreedTypeChickenPercentageViewSet)
router.register(r'chicken-stages', V1ViewSets.ChickenStageParentViewSet)
router.register(r'eggs', V1ViewSets.EggParentViewSet)
router.register(r'layed-places', V1ViewSets.LayedPlaceViewSet)
router.register(r'egg-production', V1ViewSets.EggProductionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
