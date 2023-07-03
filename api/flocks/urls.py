from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'flocks', views.FlockViewSet,
                basename='api_flocks')

urlpatterns = [
    path('', include(router.urls)),
    path('flocks/export/xlsx', views.FlockXlsxExport.as_view(),
         name="flocks_export_xlsx"),
    path('flocks/export/xls', views.FlockXlsExport.as_view(),
         name="flocks_export_xls"),
    path('flocks/export/csv', views.FlockCsvExport.as_view(),
         name="flocks_export_csv")
]
