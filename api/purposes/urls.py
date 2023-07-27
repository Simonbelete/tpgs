from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'purposes', views.PurposeViewSet,
                basename='api_purposes')
router.register(r'purposes/(?P<id>.+)/histories',
                views.PurposeHistoryViewSet, basename='api_purposes_histories'),

urlpatterns = [
    path('', include(router.urls)),
    # Xlsx
    path('purposes/export/xlsx', views.PurposeXlsxExport.as_view(),
         name="purposes_export_xlsx"),
    path('purposes/import/xlsx', views.PurposeXlsxImport.as_view(),
         name="purposes_import_xlsx"),
    # Xls
    path('purposes/export/xls', views.PurposeXlsExport.as_view(),
         name="purposes_export_xls"),
    path('purposes/import/xls', views.PurposeXlsImport.as_view(),
         name="purposes_import_xls"),
    # Csv
    path('purposes/export/csv', views.PurposeCsvExport.as_view(),
         name="purposes_export_csv"),
    path('purposes/import/csv', views.PurposeCsvImport.as_view(),
         name="purposes_import_csv")
]
