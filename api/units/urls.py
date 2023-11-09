from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'units', views.UnitViewSet,
                basename='api_units')

router.register(r'units/(?P<id>.+)/histories',
                views.UnitHistoryViewSet, basename='api_units_histories'),

summary_router = NestedDefaultRouter(
    router, r'units', lookup='id')
summary_router.register(r'summary', views.UnitSummaryViewSet,
                        basename='api_unit_summary')

router.register(r'unit-converters', views.UnitConverterViewSet,
                basename='api_units_converter')

summary2_router = NestedDefaultRouter(
    router, r'unit-converters', lookup='id')
summary2_router.register(r'summary', views.UnitSummaryViewSet,
                         basename='api_unit_converter_summary')

router.register(r'unit-converters/(?P<id>.+)/histories',
                views.UnitConverterHistoryViewSet, basename='api_units_histories'),

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),
    path('', include(summary2_router.urls)),

    path('units/export/<str:export_type>/',
         views.UnitExport.as_view(), name="api_unit_export"),
    path('units/import/<str:import_type>/',
         views.UnitImport.as_view(), name="api_unit_import"),

    path('unit-converters/export/<str:export_type>/',
         views.UnitConverterExport.as_view(), name="api_unit_converter_export"),
    path('unit-converters/import/<str:import_type>/',
         views.UnitConverterImport.as_view(), name="api_unit_converter_import"),
]
