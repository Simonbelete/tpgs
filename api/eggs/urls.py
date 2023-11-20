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

    path('eggs/export/<str:export_type>/',
         views.EggExport.as_view(), name="api_egg_export"),
    #     path('eggs/import/<str:import_type>/',
    #          views.EggImport.as_view(), name="api_egg_import"),
]
