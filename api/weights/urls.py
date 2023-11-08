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

    path('weights/export/<str:export_type>/',
         views.WeightExport.as_view(), name="api_weight_export"),
    path('weights/import/<str:import_type>/',
         views.WeightImport.as_view(), name="api_weight_import"),
]
