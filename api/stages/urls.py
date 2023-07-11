from django.urls import path, include
from rest_framework import routers
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'stages', views.StageViewSet,
                basename='api_stages')
router.register(r'stages/(?P<id>.+)/histories',
                views.StageHistoryViewSet, basename='api_stages_histories'),

urlpatterns = [
    path('', include(router.urls)),
    # Xlsx
    path('stages/export/xlsx', views.StageXlsxExport.as_view(),
         name="stages_export_xlsx"),
    path('stages/import/xlsx', views.StageXlsxImport.as_view(),
         name="stages_import_xlsx"),
    # Xls
    path('stages/export/xls', views.StageXlsExport.as_view(),
         name="stages_export_xls"),
    path('stages/import/xls', views.StageXlsImport.as_view(),
         name="stages_import_xls"),
    # Csv
    path('stages/export/csv', views.StageCsvExport.as_view(),
         name="stages_export_csv"),
    path('stages/import/csv', views.StageCsvImport.as_view(),
         name="stages_import_csv")
]
