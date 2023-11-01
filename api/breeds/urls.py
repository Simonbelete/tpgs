from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from . import views

router = routers.DefaultRouter()
router.register(r'breeds', views.BreedViewSet,
                basename='api_breeds')

router.register(r'breeds/(?P<id>.+)/histories',
                views.BreedHistoryViewSet, basename='api_breeds_histories'),

router.register(r'breeds/weight/guidelines', views.BreedWeightGuideViewSet,
                basename='api_breeds')

breed_weight_guide_router = NestedDefaultRouter(
    router, r'breeds', lookup='breed')
breed_weight_guide_router.register(r'weight/guidelines', views.BreedWeightGuideViewSet,
                       basename='api_breed_weight_guide')

# hdep_router = NestedDefaultRouter(
#     router, r'breeds', lookup='breed')
# hdep_router.register(r'hdep-guides', views.BreedHDEPGuideViewSet,
#                      basename='api_breed_hdep')

# hhep_router = NestedDefaultRouter(
#     router, r'breeds', lookup='breed')
# hhep_router.register(r'hhep-guides', views.BreedHHEPGuideViewSet,
#                      basename='api_breed_hhep')

# breed_weight_guide_router = routers.DefaultRouter()
# breed_weight_guide_router.register(r'breed-weight-guides', views.BreedWeightGuideViewSet,
#                 basename='api_weight_guide')

# breed_pk_breed_weight_guide_router = NestedDefaultRouter(
#     router, r'breeds', lookup='breed')
# breed_pk_breed_weight_guide_router.register(r'weight-guides', views.BreedWeightGuideViewSet,
#                        basename='api_breed_weight_guide')

# router.register(r'breeds/weight/guidelines/(?P<export_type>.+)', 
#                )



# breed_feed_router = NestedDefaultRouter(
#     router, r'breeds', lookup='breed')
# breed_feed_router.register(r'feed-guides', views.BreedWeightGuideViewSet,
#                        basename='api_breed_feed_guide')

# breed_egg_router = NestedDefaultRouter(
#     router, r'breeds', lookup='breed')
# breed_egg_router.register(r'egg-guides', views.BreedWeightGuideViewSet,
#                        basename='api_breed_egg_guides')

# feed_guide_router = routers.DefaultRouter()
# feed_guide_router.register(r'breed-feed-guides', views.FeedGuideViewSet,
#                 basename='api_feed_guide')

# egg_guide_router = routers.DefaultRouter()
# egg_guide_router.register(r'breed-egg-guides', views.EggGuideViewSet,
#                 basename='api_egg_guide')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(breed_weight_guide_router.urls)),
    path('breeds/weight/guidelines/<export_type>', views.BreedWeightGuideImportExport.as_view(), name="addfssdfsdf")
#     path('', include(hdep_router.urls)),
#     path('', include(breed_pk_breed_weight_guide_router.urls)),
#     path('', include(breed_weight_guide_router.urls)),
#     path('', include(breed_feed_router.urls)),
#     path('', include(breed_egg_router.urls)),

    # Xlsx
#     path('breeds/export/xlsx', views.BreedXlsxExport.as_view(),
#          name="breeds_export_xlsx"),
#     path('breeds/import/xlsx', views.BreedXlsxImport.as_view(),
#          name="breeds_import_xlsx"),
#     # Xls
#     path('breeds/export/xls', views.BreedXlsExport.as_view(),
#          name="breeds_export_xls"),
#     path('breeds/import/xls', views.BreedXlsImport.as_view(),
#          name="breeds_import_xls"),
#     # Csv
#     path('breeds/export/csv', views.BreedCsvExport.as_view(),
#          name="breeds_export_csv"),
#     path('breeds/import/csv', views.BreedCsvImport.as_view(),
#          name="breeds_import_csv"),
    
    
#     path('breed-weight-guides/export/', include([
#          path('xlsx', views.BreedWeightGuideXlsxExport.as_view(),
#               name="breed_weight_guide_export_xlsx"),
#          path('xls', views.BreedWeightGuideXlsExport.as_view(),
#              name="breed_weight_guide_export_xls"),
#          path('csv', views.BreedWeightGuideCsvExport.as_view(),
#               name="breed_weight_guide_export_csv"),
#      ])),

#     path('breed-weight-guides/import/', include([
#          path('xlsx', views.BreedWeightGuideXlsxImport.as_view(),
#               name="breed_weight_guide_import_xlsx"),
#          path('xls', views.BreedWeightGuideXlsImport.as_view(),
#               name="breed_weight_guide_import_xls"),
#          path('csv', views.BreedWeightGuideCsvImport.as_view(),
#               name="breed_weight_guide_import_csv")
#      ])),
    
#      path('', include(feed_guide_router.urls)),
#      path('breed-weight-guides/export/', include([
#          path('xlsx', views.FeedGuideXlsxExport.as_view(),
#               name="breed_feed_guide_export_xlsx"),
#          path('xls', views.FeedGuideXlsExport.as_view(),
#              name="breed_feed_guide_export_xls"),
#          path('csv', views.FeedGuideCsvExport.as_view(),
#               name="breed_feed_guide_export_csv"),
#      ])),

#     path('breed-weight-guides/import/', include([
#          path('xlsx', views.FeedGuideXlsxImport.as_view(),
#               name="breed_feed_guide_import_xlsx"),
#          path('xls', views.FeedGuideXlsImport.as_view(),
#               name="breed_feed_guide_import_xls"),
#          path('csv', views.FeedGuideCsvImport.as_view(),
#               name="breed_feed_guide_import_csv")
#      ])),
    
    
#     path('', include(egg_guide_router.urls)),
#      path('breed-egg-guides/export/', include([
#          path('xlsx', views.EggGuideXlsxExport.as_view(),
#               name="breed_egg_guide_export_xlsx"),
#          path('xls', views.EggGuideXlsExport.as_view(),
#              name="breed_egg_guide_export_xls"),
#          path('csv', views.EggGuideCsvExport.as_view(),
#               name="breed_egg_guide_export_csv"),
#      ])),

#     path('breed-egg-guides/import/', include([
#          path('xlsx', views.EggGuideXlsxImport.as_view(),
#               name="breed_egg_guide_import_xlsx"),
#          path('xls', views.EggGuideXlsImport.as_view(),
#               name="breed_egg_guide_import_xls"),
#          path('csv', views.EggGuideCsvImport.as_view(),
#               name="breed_egg_guide_import_csv")
#      ])),
]
