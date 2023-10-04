from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

"""
    `all` - Considers all data
    analyses/{{farm}}/{{flock}}/{{house}}/*
"""

directories_router = routers.DefaultRouter()
directories_router.register(r'directories', views.DirectoryListViewSet,
                            basename='api_directories_lists')

directories_ref_router = routers.DefaultRouter()
directories_ref_router.register(r'directories/refresh', views.DirectoryListRefresh,
                            basename='api_directories_lists_refresh')

hdep_router = routers.DefaultRouter()
hdep_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/hdep', views.HDEPViewSet, basename="api_hdep")

hhep_router = routers.DefaultRouter()
hhep_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/hhep', views.HHEPViewSet, basename="api_hhep")

pedigree_router = routers.DefaultRouter()
pedigree_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/pedigree', views.PedigreeViewset, basename="api_pedigree")

wbft_router = routers.DefaultRouter()
wbft_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/wbft', views.WBFT, basename="api_wbft")

urlpatterns = [
    path('', include(directories_ref_router.urls)),
    path('', include(directories_router.urls)),
    path('', include(hdep_router.urls)),
    path('', include(hhep_router.urls)),
    path('', include(pedigree_router.urls)),
    path('', include(wbft_router.urls)),
]
