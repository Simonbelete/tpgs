from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from . import views

router = routers.DefaultRouter()
router.register(r'breeds', views.BreedViewSet,
                basename='api_breeds')

router.register(r'breeds/(?P<id>.+)/histories',
                views.BreedHistoryViewSet, basename='api_breeds_histories'),

# Breed Weight Guideline
router.register(r'breeds/weight/guidelines', views.BreedWeightGuidelineViewSet,
                basename='api_breed_weight_guideline')

weight_summary_router = NestedDefaultRouter(
    router, r'breeds/weight/guidelines', lookup='id')
weight_summary_router.register(r'summary', views.BreedWeightGuidelineSummaryViewSet,
                               basename='api_breed_weight_guideline_summary')

router.register(r'breeds/weight/guideline/(?P<id>.+)/histories',
                views.BreedWeightGuidelineHistoryViewSet, basename='api_breed_weight_guideline-histories'),

breed_weight_guide_router = NestedDefaultRouter(
    router, r'breeds', lookup='breed')
breed_weight_guide_router.register(r'weight/guidelines', views.BreedWeightGuidelineViewSet,
                                   basename='api_breed_weight_guide')

# Breed Egg Guideline
router.register(r'breeds/egg/guidelines', views.BreedEggGuidelineViewSet,
                basename='api_breed_egg_guideline')

egg_summary_router = NestedDefaultRouter(
    router, r'breeds/egg/guidelines', lookup='id')
egg_summary_router.register(r'summary', views.BreedEggGuidelineSummaryViewSet,
                            basename='api_breed_egg_guideline_summary')

router.register(r'breeds/egg/guideline/(?P<id>.+)/histories',
                views.BreedEggGuidelineHistoryViewSet, basename='api_breed_egg_guideline-histories'),

breed_egg_guide_router = NestedDefaultRouter(
    router, r'breeds', lookup='breed')
breed_egg_guide_router.register(r'egg/guidelines', views.BreedEggGuidelineViewSet,
                                basename='api_breed_egg_guide')

# Breed Feed Guideline
router.register(r'breeds/feed/guidelines', views.BreedFeedGuidelineViewSet,
                basename='api_breed_feed_guideline')

feed_summary_router = NestedDefaultRouter(
    router, r'breeds/feed/guidelines', lookup='id')
feed_summary_router.register(r'summary', views.BreedFeedGuidelineSummaryViewSet,
                             basename='api_breed_feed_guideline_summary')

router.register(r'breeds/feed/guideline/(?P<id>.+)/histories',
                views.BreedFeedGuidelineHistoryViewSet, basename='api_breed_feed_guideline-histories'),

breed_feed_guide_router = NestedDefaultRouter(
    router, r'breeds', lookup='breed')
breed_feed_guide_router.register(r'feed/guidelines', views.BreedFeedGuidelineViewSet,
                                 basename='api_breed_feed_guide')

# Breed HDEP Guideline
router.register(r'breeds/hdep/guidelines', views.BreedHDEPGuidelineViewSet,
                basename='api_breed_hdep_guideline')

hdep_summary_router = NestedDefaultRouter(
    router, r'breeds/hdep/guidelines', lookup='id')
hdep_summary_router.register(r'summary', views.BreedHDEPGuidelineSummaryViewSet,
                             basename='api_breed_hdep_guideline_summary')

router.register(r'breeds/hdep/guideline/(?P<id>.+)/histories',
                views.BreedHDEPGuidelineHistoryViewSet, basename='api_breed_hdep_guideline-histories'),

breed_hdep_guide_router = NestedDefaultRouter(
    router, r'breeds', lookup='breed')
breed_hdep_guide_router.register(r'hdep/guidelines', views.BreedHDEPGuidelineViewSet,
                                 basename='api_breed_hdep_guide')

# Breed HHEP Guideline
router.register(r'breeds/hhep/guidelines', views.BreedHHEPGuidelineViewSet,
                basename='api_breed_hhep_guideline')

hhep_summary_router = NestedDefaultRouter(
    router, r'breeds/hhep/guidelines', lookup='id')
hhep_summary_router.register(r'summary', views.BreedHHEPGuidelineSummaryViewSet,
                             basename='api_breed_hhep_guideline_summary')

router.register(r'breeds/hhep/guideline/(?P<id>.+)/histories',
                views.BreedHHEPGuidelineHistoryViewSet, basename='api_breed_hhep_guideline-histories'),

breed_hhep_guide_router = NestedDefaultRouter(
    router, r'breeds', lookup='breed')
breed_hhep_guide_router.register(r'hhep/guidelines', views.BreedHHEPGuidelineViewSet,
                                 basename='api_breed_hhep_guide')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(breed_weight_guide_router.urls)),
    path('', include(weight_summary_router.urls)),
    path('', include(breed_weight_guide_router.urls)),
    path('', include(egg_summary_router.urls)),
    path('', include(breed_egg_guide_router.urls)),
    path('', include(feed_summary_router.urls)),
    path('', include(breed_feed_guide_router.urls)),
    path('', include(hdep_summary_router.urls)),
    path('', include(breed_hdep_guide_router.urls)),
    path('', include(hhep_summary_router.urls)),
    path('', include(breed_hhep_guide_router.urls)),

    path('breeds/<str:export_type>/',
         views.BreedExport.as_view(), name="api_breed_export"),
    path('breeds/<str:import_type>/',
         views.BreedImport.as_view(), name="api_breed_import"),

    path('breeds/weight/guidelines/export/<str:export_type>/',
         views.BreedWeightGuidelineExport.as_view(), name="api_weight_guidelines_export"),
    path('breeds/weight/guidelines/import/<str:import_type>/',
         views.BreedWeightGuidelineImport.as_view(), name="api_weight_guidelines_import"),

    path('breeds/feed/guidelines/export/<str:export_type>/',
         views.BreedFeedGuidelineExport.as_view(), name="api_feed_guidelines_export"),
    path('breeds/feed/guidelines/import/<str:import_type>/',
         views.BreedFeedGuidelineImport.as_view(), name="api_feed_guidelines_import"),

    path('breeds/egg/guidelines/export/<str:export_type>/',
         views.BreedEggGuidelineExport.as_view(), name="api_egg_guidelines_export"),
    path('breeds/egg/guidelines/import/<str:import_type>/',
         views.BreedEggGuidelineImport.as_view(), name="api_egg_guidelines_import"),

    path('breeds/hdep/guidelines/export/<str:export_type>/',
         views.BreedHDEPGuidelineExport.as_view(), name="api_hdep_guidelines_export"),
    path('breeds/hdep/guidelines/import/<str:import_type>/',
         views.BreedHDEPGuidelineImport.as_view(), name="api_hdep_guidelines_import"),

    path('breeds/hhep/guidelines/export/<str:export_type>/',
         views.BreedHHEPGuidelineExport.as_view(), name="api_hhep_guidelines_export"),
    path('breeds/hhep/guidelines/import/<str:import_type>/',
         views.BreedHHEPGuidelineImport.as_view(), name="api_hhep_guidelines_import"),

]
