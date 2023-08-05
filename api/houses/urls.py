from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'houses', views.HouseViewSet,
                basename='api_houses'),

urlpatterns = [
    path('', include(router.urls)),

    # Xlsx
    path('houses/export/xlsx', views.HouseXlsxExport.as_view(),
         name="houses_export_xlsx"),
    path('houses/import/xlsx', views.HouseXlsxImport.as_view(),
         name="houses_import_xlsx"),
    # Xls
    path('houses/export/xls', views.HouseXlsExport.as_view(),
         name="houses_export_xls"),
    path('houses/import/xls', views.HouseXlsImport.as_view(),
         name="houses_import_xls"),
    # Csv
    path('houses/export/csv', views.HouseCsvExport.as_view(),
         name="houses_export_csv"),
    path('houses/import/csv', views.HouseCsvImport.as_view(),
         name="houses_import_csv")
]