from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'weights', views.WeightViewSet,
                basename='api_weights')
router.register(r'weights/(?P<id>.+)/histories',
                views.WeightHistoryViewSet, basename='api_weights_histories'),

urlpatterns = [
    path('', include(router.urls)),
    # Xlsx
    path('weights/export/xlsx', views.WeightXlsxExport.as_view(),
         name="weights_export_xlsx"),
    path('weights/import/xlsx', views.WeightXlsxImport.as_view(),
         name="weights_import_xlsx"),
    # Xls
    path('weights/export/xls', views.WeightXlsExport.as_view(),
         name="weights_export_xls"),
    path('weights/import/xls', views.WeightXlsImport.as_view(),
         name="weights_import_xls"),
    # Csv
    path('weights/export/csv', views.WeightCsvExport.as_view(),
         name="weights_export_csv"),
    path('weights/import/csv', views.WeightCsvImport.as_view(),
         name="weights_import_csv")
]
