from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from . import views

router = routers.DefaultRouter()
router.register(r'chickens', views.ChickenViewSet,
                basename='api_chickens')
summary_router = NestedDefaultRouter(
    router, r'chickens', lookup='id')
summary_router.register(r'summary', views.ChickenSummaryViewSet,
                        basename='api_chicken_summary')

router.register(r'chickens/(?P<id>.+)/offspring',
                views.ChickenOffspringViewSet, basename='api_chicken_offspring'),
router.register(r'chickens/(?P<id>.+)/ancestors',
                views.ChickenAncestorViewSet, basename='api_chicken_ancestors'),
router.register(r'chickens/(?P<id>.+)/siblings',
                views.SiblingsViewSet, basename='api_chicken_siblings'),
router.register(r'chickens/(?P<id>.+)/histories',
                views.ChickenHistoryViewSet, basename='api_chickens_histories'),


gen_router = routers.DefaultRouter()
gen_router.register(r'chickens/generations', views.GenerationViewSet,
                    basename='api_generations')

router.register(r'chicken-grid/(?P<id>.+)', views.ChickenGridViewSet,
                basename='api_chicken_grid')

urlpatterns = [
    path('', include(gen_router.urls)),
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

    path('chickens/import/', include([
        path('xlsx', views.ChickenXlsxImport.as_view(),
             name="chickens_import_xlsx"),
        path('xls', views.ChickenXlsImport.as_view(),
             name="chickens_import_xls"),
        path('csv', views.ChickenCsvImport.as_view(),
             name="chickens_import_csv")
    ])),

    path('chickens/export/', include([
        path('xlsx', views.ChickenXlsxExport.as_view(),
             name="chickens_export_xlsx"),
        path('xls', views.ChickenXlsExport.as_view(),
             name="chickens_export_xls"),
        path('csv', views.ChickenCsvExport.as_view(),
             name="chickens_export_csv")
    ])),

]
