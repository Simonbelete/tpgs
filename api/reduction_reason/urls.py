from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'reduction-reasons', views.ReductionReasonViewSet,
                basename='api_reductionReasons'),
router.register(r'reduction-reasons/(?P<id>.+)/histories',
                views.ReductionReasonHistoryViewSet, basename='api_ReductionReason_histories'),

summary_router = NestedDefaultRouter(
    router, r'reduction-reasons', lookup='id')
summary_router.register(r'summary', views.ReductionReasonSummaryViewSet,
                        basename='api_ReductionReason_summary')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

    path('reduction-reasons/export/', include([
        path('xlsx', views.ReductionReasonXlsxExport.as_view(),
             name="reductionReasons_export_xlsx"),
        #    path('xls', views.ReductionReasonXlsExport.as_view(),
        #         name="reductionReasons_export_xls"),
        #    path('csv', views.ReductionReasonCsvExport.as_view(),
        #         name="reductionReasons_export_csv"),
    ])),

    #     path('reduction-reasons/import/', include([
    #         path('xlsx', views.ReductionReasonXlsxImport.as_view(),
    #              name="reductionReasons_import_xlsx"),
    #         path('xls', views.ReductionReasonXlsImport.as_view(),
    #              name="reductionReasons_import_xls"),
    #         path('csv', views.ReductionReasonCsvImport.as_view(),
    #              name="reductionReasons_import_csv")
    #     ]))
]
