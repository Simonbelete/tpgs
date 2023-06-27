from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet,
                basename='api_users'),
router.register(r'groups', views.GroupViewSet,
                basename='api_groups'),
router.register(r'permissions', views.PermissionViewSet,
                basename='api_permissions'),

urlpatterns = [
    path('', include(router.urls))
]
