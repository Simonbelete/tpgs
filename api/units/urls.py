from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'units', views.UnitViewSet,
                basename='api_units')
router.register(r'unit-converters', views.UnitConverterViewSet,
                basename='api_units_converter')

summary_router = NestedDefaultRouter(
    router, r'units', lookup='id')
summary_router.register(r'summary', views.UnitSummaryViewSet,
                        basename='api_unit_summary')

summary2_router = NestedDefaultRouter(
    router, r'unit-converters', lookup='id')
summary2_router.register(r'summary', views.UnitSummaryViewSet,
                        basename='api_unit_converter_summary')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),
    path('', include(summary2_router.urls)),

    path('units/export/', include([
        path('xlsx', views.UnitXlsxExport.as_view(),
             name="units_export_xlsx"),
        path('xls', views.UnitXlsExport.as_view(),
             name="units_export_xls"),
        path('csv', views.UnitCsvExport.as_view(),
              name="units_export_csv"),
    ])),

    path('units/import/', include([
        path('xlsx', views.UnitXlsxImport.as_view(),
             name="units_import_xlsx"),
        path('xls', views.UnitXlsImport.as_view(),
             name="units_import_xls"),
        path('csv', views.UnitCsvImport.as_view(),
              name="units_import_csv")
    ])),

     path('unit-converters/export/', include([
        path('xlsx', views.UnitConverterXlsxExport.as_view(),
             name="unit_converter_export_xlsx"),
        path('xls', views.UnitConverterXlsExport.as_view(),
             name="unit_converter_export_xls"),
         path('csv', views.UnitConverterCsvExport.as_view(),
              name="unit_converter_export_csv"),
         ])),

    path('unit-converters/import/', include([
         path('xlsx', views.UnitConverterXlsxImport.as_view(),
              name="unit_converter_import_xlsx"),
         path('xls', views.UnitConverterXlsImport.as_view(),
              name="unit_converter_import_xls"),
         path('csv', views.UnitConverterCsvImport.as_view(),
              name="unit_converter_import_csv")
         ]))
]
