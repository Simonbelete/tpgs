from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

"""
    `all` - Considers all data
    analyses/{{farm}}/{{flock}}/{{house}}/{{pen}}/*
"""

# router = routers.DefaultRouter()
# router.register(r'analyses', None,
#                 basename='api_analyses')

directories_router = routers.DefaultRouter()
directories_router.register(r'directories', views.DirectoryListViewSet,
                            basename='api_directories_lists')

# farm_router = NestedDefaultRouter(
#     router, r'analyses', lookup='formula')

urlpatterns = [
    # path('', include(router.urls)),
    path('', include(directories_router.urls)),
]
