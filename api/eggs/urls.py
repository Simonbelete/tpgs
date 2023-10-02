from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from . import views

router = routers.DefaultRouter()
router.register(r'eggs', views.EggViewSet,
                basename='api_eggs')
router.register(r'eggs/(?P<id>.+)/histories',
                views.EggHistoryViewSet, basename='api_eggs_histories'),

summary_router = NestedDefaultRouter(
    router, r'eggs', lookup='id')
summary_router.register(r'summary', views.EggSummaryViewSet,
                        basename='api_eggs_summary')
urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

     path('eggs/export/', include([
          path('xlsx', views.EggXlsxExport.as_view(),
              name="eggs_export_xlsx"),
          path('xls', views.EggXlsExport.as_view(),
               name="eggs_export_xls"),
          path('csv', views.EggCsvExport.as_view(),
               name="eggs_export_csv"),
     ])),

     path('eggs/import/', include([
          path('xlsx', views.EggXlsxImport.as_view(),
              name="eggs_import_xlsx"),
          path('xls', views.EggXlsImport.as_view(),
               name="eggs_import_xls"),
          path('csv', views.EggCsvImport.as_view(),
               name="eggs_import_csv")
     ]))
]
