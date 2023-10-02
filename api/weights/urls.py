from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from . import views

router = routers.DefaultRouter()
router.register(r'weights', views.WeightViewSet,
                basename='api_weights')
router.register(r'weights/(?P<id>.+)/histories',
                views.WeightHistoryViewSet, basename='api_weights_histories'),

summary_router = NestedDefaultRouter(
    router, r'weights', lookup='id')
summary_router.register(r'summary', views.WeightSummaryViewSet,
                        basename='api_weight_summary')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

    path('weights/export/', include([
          path('xlsx', views.WeightXlsxExport.as_view(),
              name="weights_export_xlsx"),
          path('xls', views.WeightXlsExport.as_view(),
               name="weights_export_xls"),
          path('csv', views.WeightCsvExport.as_view(),
               name="weights_export_csv"),
     ])),

     path('weights/import/', include([
          path('xlsx', views.WeightXlsxImport.as_view(),
              name="weights_import_xlsx"),
          path('xls', views.WeightXlsImport.as_view(),
               name="weights_import_xls"),
          path('csv', views.WeightCsvImport.as_view(),
               name="weights_import_csv")
     ]))
]
