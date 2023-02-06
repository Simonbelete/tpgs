from django.urls import path, include
from rest_framework import routers

import pfm_api.v1.views as V1ViewSets

router = routers.DefaultRouter()
router.register(r'users', V1ViewSets.UserViewSet,basename='users')
router.register(r'users/all/count', V1ViewSets.UserAllCountViewSet,basename='users_count')
router.register(r'users/uid', V1ViewSets.UserUidViewSet,basename='user_with_uid')
router.register(r'users/devices', V1ViewSets.DeviceViewSet)
router.register(r'farms', V1ViewSets.FarmViewSet)
router.register(r'chickens', V1ViewSets.ChickenViewSet)
router.register(r'chickens/(?P<chicken_pk>.+)/growth/all', V1ViewSets.AllChickenGrowthViewSet)
router.register(r'chicken-growths', V1ViewSets.ChickenGrowthViewSet,basename='chicken_growth')
router.register(r'chickens/parents', V1ViewSets.ChickenParentViewSet)
router.register(r'breed-types', V1ViewSets.BreedTypeParentViewSet)
router.register(r'breed-types/report/chicken-percentage', V1ViewSets.BreedTypeChickenPercentageViewSet)
router.register(r'chicken-stages', V1ViewSets.ChickenStageViewSet)
router.register(r'layed-places', V1ViewSets.LayedPlaceViewSet)
router.register(r'eggs', V1ViewSets.EggViewSet)
router.register(r'feed-types', V1ViewSets.FeedTypeViewSet)
router.register(r'feeds', V1ViewSets.FeedViewSet)
router.register(r'export/weights/csv', V1ViewSets.WeightExport_CSV, basename='export_weight_csv')
router.register(r'export/weights/xlsx', V1ViewSets.WeightExport_XLSX,basename='export_weight_xlsx')
router.register(r'charts/weights', V1ViewSets.ReportWeight_IMG,basename='charts_weight_png')

urlpatterns = [
    path('', include(router.urls)),
]
