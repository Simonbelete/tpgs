from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'chickens', views.ChickenViewSet,
                basename='api_chickens')
router.register(r'chickens/(?P<id>.+)/histories',
                views.ChickenHistoryViewSet, basename='api_chickens_histories'),


urlpatterns = [
    path('', include(router.urls)),

    # Xlsx
    path('chickens/export/xlsx', views.ChickenXlsxExport.as_view(),
         name="chickens_export_xlsx"),
    path('chickens/import/xlsx', views.ChickenXlsxImport.as_view(),
         name="chickens_import_xlsx"),
    # Xls
    path('chickens/export/xls', views.ChickenXlsExport.as_view(),
         name="chickens_export_xls"),
    path('chickens/import/xls', views.ChickenXlsImport.as_view(),
         name="chickens_import_xls"),
    # Csv
    path('chickens/export/csv', views.ChickenCsvExport.as_view(),
         name="chickens_export_csv"),
    path('chickens/import/csv', views.ChickenCsvImport.as_view(),
         name="chickens_import_csv")
]
