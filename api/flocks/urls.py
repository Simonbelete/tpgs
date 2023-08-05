from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter

from . import views

router = routers.DefaultRouter()
router.register(r'flocks', views.FlockViewSet,
                basename='api_flocks')
router.register(r'flocks/(?P<id>.+)/histories',
                views.FlockHistoryViewSet, basename='api_flocks_histories'),

accusation_router = NestedDefaultRouter(
    router, r'flocks', lookup='flock')
accusation_router.register(
    r'accusations', views.FlockAccusationViewSet, basename='api_flock_accusations')

reduction_router = NestedDefaultRouter(
    router, r'flocks', lookup='flock')
reduction_router.register(r'reduction', views.FlockReductionViewSet,
                          basename='api_flock_reduction')

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
         name="flocks_import_csv"),
    path('', include(accusation_router.urls)),
    path('', include(reduction_router.urls)),
]
