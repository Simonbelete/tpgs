from django.urls import include, path
from rest_framework import routers

from users.api.views import UserViewSet, GroupViewSet

users_router = routers.DefaultRouter()
users_router.register(r'', UserViewSet, basename='api_users')

groups_router = routers.DefaultRouter()
groups_router.register(r'', GroupViewSet, basename='api_groups')

urlpatterns = [
    path('users/', include(users_router.urls)),
    path('groups/', include(groups_router.urls)),
]
