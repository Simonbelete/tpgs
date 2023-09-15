from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

"""
    `all` - Considers all data
    analyses/{{farm}}/{{flock}}/{{house}}/*
"""

# router = routers.DefaultRouter()
# router.register(r'analyses', None,
#                 basename='api_analyses')

directories_router = routers.DefaultRouter()
directories_router.register(r'directories', views.DirectoryListViewSet,
                            basename='api_directories_lists')
directories_router.register(r'directories/refresh', views.DirectoryListRefresh,
                            basename='api_directories_lists_refresh')

hdep_router = routers.DefaultRouter()
hdep_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/hdep', views.HDEPViewSet, basename="api_hdep")

hhep_router = routers.DefaultRouter()
hhep_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/hhep', views.HHEPViewSet, basename="api_hhep")


urlpatterns = [
    # path('', include(router.urls)),
    path('', include(directories_router.urls)),
    path('', include(hdep_router.urls)),
    path('', include(hhep_router.urls)),
]
