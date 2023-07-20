from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'breeds', views.BreedViewSet,
                basename='api_breeds')
router.register(r'breeds/(?P<id>.+)/histories',
                views.BreedHistoryViewSet, basename='api_breeds_histories'),


urlpatterns = [
    path('', include(router.urls)),

    # Xlsx
    path('breeds/export/xlsx', views.BreedXlsxExport.as_view(),
         name="breeds_export_xlsx"),
    path('breeds/import/xlsx', views.BreedXlsxImport.as_view(),
         name="breeds_import_xlsx"),
    # Xls
    path('breeds/export/xls', views.BreedXlsExport.as_view(),
         name="breeds_export_xls"),
    path('breeds/import/xls', views.BreedXlsImport.as_view(),
         name="breeds_import_xls"),
    # Csv
    path('breeds/export/csv', views.BreedCsvExport.as_view(),
         name="breeds_export_csv"),
    path('breeds/import/csv', views.BreedCsvImport.as_view(),
         name="breeds_import_csv")
]
