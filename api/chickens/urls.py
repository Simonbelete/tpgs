from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'chickens', views.ChickenViewSet,
                basename='api_chickens')
router.register(r'chickens/(?P<id>.+)/histories',
                views.ChickenHistoryViewSet, basename='api_chickens_histories'),


urlpatterns = [
    path('', include(router.urls)),
    
    path('chickens/import/', include([
          path('xlsx', views.ChickenXlsxImport.as_view(),
               name="chickens_import_xlsx"),
          path('xls', views.ChickenXlsImport.as_view(),
               name="chickens_import_xls"),
          path('csv', views.ChickenCsvImport.as_view(),
               name="chickens_import_csv")
    ])),

    path('chickens/import/', include([
          path('xlsx', views.ChickenXlsxExport.as_view(),
               name="chickens_export_xlsx"),
          path('xls', views.ChickenXlsExport.as_view(),
               name="chickens_export_xls"),
          path('csv', views.ChickenCsvExport.as_view(),
               name="chickens_export_csv")
    ])),
    
]
