from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'purposes', views.PurposeViewSet,
                basename='api_purposes')
router.register(r'purposes/(?P<id>.+)/histories',
                views.PurposeHistoryViewSet, basename='api_purposes_histories'),

summary_router = NestedDefaultRouter(
    router, r'purposes', lookup='id')
summary_router.register(r'summary', views.PurposeSummaryViewSet,
                        basename='api_house_summary')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

    path('purposes/export/', include([
          path('xlsx', views.PurposeXlsxExport.as_view(),
             name="purposes_export_xlsx"),
          path('xls', views.PurposeXlsExport.as_view(),
             name="purposes_export_xls"),
          path('csv', views.PurposeCsvExport.as_view(),
              name="purposes_export_csv"),
     ])),

     path('purposes/import/', include([
          path('xlsx', views.PurposeXlsxImport.as_view(),
              name="purposes_import_xlsx"),
          path('xls', views.PurposeXlsImport.as_view(),
              name="purposes_import_xls"),
          path('csv', views.PurposeCsvImport.as_view(),
              name="purposes_import_csv")
     ]))
]
