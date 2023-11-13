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

    path('purposes/export/<str:export_type>/',
         views.BreedExport.as_view(), name="api_purpose_export"),
    path('purposes/import/<str:import_type>/',
         views.BreedImport.as_view(), name="api_purpose_import"),
]
