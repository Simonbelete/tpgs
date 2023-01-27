from django.urls import path, include
from rest_framework import routers

from pfm_api.v1.views import UserViewSet, DeviceViewSet, UserUidViewSet, FarmViewSet

router =routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'users/uid', UserUidViewSet)
router.register(r'users/devices', DeviceViewSet)
router.register(r'farms', FarmViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
