from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'feeds', views.FeedViewSet,
                basename='api_feeds')
router.register(r'feeds/(?P<id>.+)/histories',
                views.FeedHistoryViewSet, basename='api_feeds_histories'),

urlpatterns = [
    path('', include(router.urls)),
    # Xlsx
    path('feeds/export/xlsx', views.FeedXlsxExport.as_view(),
         name="feeds_export_xlsx"),
    path('feeds/import/xlsx', views.FeedXlsxImport.as_view(),
         name="feeds_import_xlsx"),
    # Xls
    path('feeds/export/xls', views.FeedXlsExport.as_view(),
         name="feeds_export_xls"),
    path('feeds/import/xls', views.FeedXlsImport.as_view(),
         name="feeds_import_xls"),
    # Csv
    path('feeds/export/csv', views.FeedCsvExport.as_view(),
         name="feeds_export_csv"),
    path('feeds/import/csv', views.FeedCsvImport.as_view(),
         name="feeds_import_csv")
]
