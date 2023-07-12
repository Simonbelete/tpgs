from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'flocks', views.FlockViewSet,
                basename='api_flocks')
router.register(r'flocks/(?P<id>.+)/histories',
                views.FlockHistoryViewSet, basename='api_flocks_histories'),

urlpatterns = [
    path('', include(router.urls)),
    # Xlsx
    path('flocks/export/xlsx', views.FlockXlsxExport.as_view(),
         name="flocks_export_xlsx"),
    path('flocks/import/xlsx', views.FlockXlsxImport.as_view(),
         name="flocks_import_xlsx"),
    # Xls
    path('flocks/export/xls', views.FlockXlsExport.as_view(),
         name="flocks_export_xls"),
    path('flocks/import/xls', views.FlockXlsImport.as_view(),
         name="flocks_import_xls"),
    # Csv
    path('flocks/export/csv', views.FlockCsvExport.as_view(),
         name="flocks_export_csv"),
    path('flocks/import/csv', views.FlockCsvImport.as_view(),
         name="flocks_import_csv")
]