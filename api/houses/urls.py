from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'houses', views.HouseViewSet,
                basename='api_house'),
router.register(r'houses/(?P<id>.+)/histories',
                views.HouseHistoryViewSet, basename='api_house_history'),

summary_router = NestedDefaultRouter(
    router, r'houses', lookup='id')
summary_router.register(r'summary', views.HouseSummaryViewSet,
                        basename='api_house_summary')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),

    path('houses/export/<str:export_type>/',
         views.HouseExport.as_view(), name="api_house_export"),
    path('houses/import/<str:import_type>/',
         views.HouseImport.as_view(), name="api_house_import"),
]
