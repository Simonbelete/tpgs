from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from . import views

router = routers.DefaultRouter()
router.register(r'feeds', views.FeedViewSet,
                basename='api_feeds')
router.register(r'feeds/(?P<id>.+)/histories',
                views.FeedHistoryViewSet, basename='api_feeds_histories'),

summary_router = NestedDefaultRouter(
    router, r'feeds', lookup='id')
summary_router.register(r'summary', views.FeedSummaryViewSet,
                        basename='api_feeds_summary')

urlpatterns = [
    path('', include(router.urls)),

    path('feeds/export/', include([
          path('xlsx', views.FeedXlsxExport.as_view(),
              name="feeds_export_xlsx"),
          path('xls', views.FeedXlsExport.as_view(),
               name="feeds_export_xls"),
          path('csv', views.FeedCsvExport.as_view(),
               name="feeds_export_csv"),
     ])),

     path('feeds/import/', include([
          path('xlsx', views.FeedXlsxImport.as_view(),
              name="feeds_import_xlsx"),
          path('xls', views.FeedXlsImport.as_view(),
               name="feeds_import_xls"),
          path('csv', views.FeedCsvImport.as_view(),
               name="feeds_import_csv")
     ]))
]
