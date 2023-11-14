from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

"""
    `all` - Considers all data
    analyses/{{farm}}/{{flock}}/{{house}}/*
"""

router = routers.DefaultRouter()

router.register(r'analyses/egg-production', views.EggProduction,
                basename='api_analyses_egg_production')

router.register(r'analyses/gender-distribution', views.GenderDistributionViewSet,
                basename='api_analyses_gender-distribution')

router.register(r'analyses/breed-distribution', views.BreedDistributionViewSet,
                basename='api_analyses_breed-distribution')

router.register(r'analyses/chicken-age-group', views.ChickenAgeGroupViewSet,
                basename='api_analyses_age_group')

router.register(r'analyses/growth-performance', views.GrowthPerformanceViewSet,
                basename='api_analyses_growth_performance')

router.register(r'analyses/feed-by-weight', views.FeedByWeightViewSet,
                basename='api_analyses_feed_by_weight')

router.register(r'analyses/eggs', views.EggsViewSet,
                basename='api_analyses_eggs')

router.register(r'analyses/egg-grading', views.EggGradingViewSet,
                basename='api_analyses_egg_grading')

count_router = routers.DefaultRouter()
count_router.register(r'analyses/count', views.CountViewSet,
                      basename='api_count')

directories_router = routers.DefaultRouter()
directories_router.register(r'directories', views.DirectoryListViewSet,
                            basename='api_directories_lists')

batch_directories_router = routers.DefaultRouter()
batch_directories_router.register(r'directories/batch', views.BatchDirectoryListViewSet,
                                  basename='api_batch_directories_lists')

directories_ref_router = routers.DefaultRouter()
directories_ref_router.register(r'directories/refresh', views.DirectoryListRefresh,
                                basename='api_directories_lists_refresh')

hdep_router = routers.DefaultRouter()
hdep_router.register(
    r'analyses/hdep', views.HDEPViewSet, basename="api_hdep")

fcre_router = routers.DefaultRouter()
fcre_router.register(
    r'analyses/fcre', views.FCRE, basename="api_fcre")

fcrw_router = routers.DefaultRouter()
fcrw_router.register(
    r'analyses/fcrw', views.FCRE, basename="api_fcre")

hhep_router = routers.DefaultRouter()
hhep_router.register(
    r'analyses/hhep', views.HHEPViewSet, basename="api_hhep")

egg_mass_router = routers.DefaultRouter()
egg_mass_router.register(
    r'analyses/egg-mass', views.EggMassViewSet, basename="api_egg_mass")


pedigree_router = routers.DefaultRouter()
pedigree_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/pedigree', views.PedigreeViewset, basename="api_pedigree")

wbft_router = routers.DefaultRouter()
wbft_router.register(
    r'analyses/(?P<farm_id>.+)/(?P<flock_id>.+)/(?P<house_id>.+)/wbft', views.WBFT, basename="api_wbft")


urlpatterns = [
    path('', include(router.urls)),
    path('', include(count_router.urls)),
    path('', include(directories_ref_router.urls)),
    path('', include(batch_directories_router.urls)),
    path('', include(directories_router.urls)),
    path('', include(hdep_router.urls)),
    path('', include(hhep_router.urls)),
    path('', include(pedigree_router.urls)),
    path('', include(wbft_router.urls)),
    path('', include(fcre_router.urls)),
    path('', include(fcrw_router.urls)),
    path('', include(egg_mass_router.urls)),
]
