from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'houses', views.HouseViewSet,
                basename='api_houses'),

summary_router = NestedDefaultRouter(
    router, r'houses', lookup='id')
summary_router.register(r'summary', views.HouseSummaryViewSet,
                        basename='api_house_summary')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

    path('houses/export/', include([
        path('xlsx', views.HouseXlsxExport.as_view(),
             name="houses_export_xlsx"),
        path('houses/export/xls', views.HouseXlsExport.as_view(),
             name="houses_export_xls"),
         path('houses/export/csv', views.HouseCsvExport.as_view(),
              name="houses_export_csv"),
         ])),

    path('houses/import/', include([
         path('xlsx', views.HouseXlsxImport.as_view(),
              name="houses_import_xlsx"),
         path('xls', views.HouseXlsImport.as_view(),
              name="houses_import_xls"),
         path('csv', views.HouseCsvImport.as_view(),
              name="houses_import_csv")
         ]))
]
