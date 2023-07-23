from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'eggs', views.EggViewSet,
                basename='api_eggs')
router.register(r'eggs/(?P<id>.+)/histories',
                views.EggHistoryViewSet, basename='api_eggs_histories'),

urlpatterns = [
    path('', include(router.urls)),
    # Xlsx
    path('eggs/export/xlsx', views.EggXlsxExport.as_view(),
         name="eggs_export_xlsx"),
    path('eggs/import/xlsx', views.EggXlsxImport.as_view(),
         name="eggs_import_xlsx"),
    # Xls
    path('eggs/export/xls', views.EggXlsExport.as_view(),
         name="eggs_export_xls"),
    path('eggs/import/xls', views.EggXlsImport.as_view(),
         name="eggs_import_xls"),
    # Csv
    path('eggs/export/csv', views.EggCsvExport.as_view(),
         name="eggs_export_csv"),
    path('eggs/import/csv', views.EggCsvImport.as_view(),
         name="eggs_import_csv")
]
