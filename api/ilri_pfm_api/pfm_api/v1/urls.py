from django.urls import path, include
from rest_framework import routers
# from pfm_api.v1.views import UserViewSet, FarmViewSet

router =routers.DefaultRouter()
# router.register(r'users', UserViewSet)
# router.register(r'farms', FarmViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
