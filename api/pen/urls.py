from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'pen', views.PenViewSet,
                basename='api_pen'),
router.register(r'pen/(?P<id>.+)/histories',
                views.PenHistoryViewSet, basename='api_pen_histories'),

summary_router = NestedDefaultRouter(
    router, r'pen', lookup='id')
summary_router.register(r'summary', views.PenSummaryViewSet,
                        basename='api_pen_summary')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

    path('pen/export/', include([
        path('xlsx', views.PenXlsxExport.as_view(),
             name="pen_export_xlsx"),
        path('xls', views.PenXlsExport.as_view(),
             name="pen_export_xls"),
         path('csv', views.PenCsvExport.as_view(),
              name="pen_export_csv"),
         ])),

    path('pen/import/', include([
         path('xlsx', views.PenXlsxImport.as_view(),
              name="pen_import_xlsx"),
         path('xls', views.PenXlsImport.as_view(),
              name="pen_import_xls"),
         path('csv', views.PenCsvImport.as_view(),
              name="pen_import_csv")
         ]))
]
