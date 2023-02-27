from django.urls import include, path
from rest_framework import routers

from users.api.views import UserViewSet, GroupViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='api_users')
router.register(r'groups', GroupViewSet, basename='api_groups')

urlpatterns = [
    path('', include(router.urls)),
]
