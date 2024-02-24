from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'hatchery', views.HatcheryViewSet,
                basename='api_hatchery')

router.register(r'hatchery/(?P<id>.+)/histories',
                views.HatcheryHistoryViewSet, basename='api_breeds_histories'),

summary_router = NestedDefaultRouter(
    router, r'hatchery', lookup='id')
summary_router.register(r'hatchery', views.HatcherySummaryViewSet,
                        basename='api_hatchery_summary')

# Hatchery Eggs
router.register(r'hatchery-eggs', views.HatcheryEggViewSet,
                basename='api_hatchery_egg')

hatchery_egg_summary_router = NestedDefaultRouter(
    router, r'hatchery-eggs', lookup='id')
hatchery_egg_summary_router.register(r'summary', views.HatcheryEggSummaryViewSet,
                                     basename='api_hatchery_egg_summary')

router.register(r'hatchery-eggs/(?P<id>.+)/histories',
                views.HatcheryEggHistoryViewSet, basename='api_hatchery_egg_hisory'),

hatchery_egg_router = NestedDefaultRouter(
    router, r'hatchery', lookup='hatchery')
hatchery_egg_router.register(r'eggs', views.HatcheryEggViewSet,
                             basename='api_hatchery_eggs')

# Incubation
router.register(r'incubations', views.IncubationViewSet,
                basename='api_incubation')

incubation_summary_router = NestedDefaultRouter(
    router, r'incubations', lookup='id')
incubation_summary_router.register(r'summary', views.IncubationSummaryViewSet,
                                   basename='api_incubation_summary')

router.register(r'incubations/(?P<id>.+)/histories',
                views.IncubationSummaryViewSet, basename='api_incubation_hisory'),

hatchery_incubation_router = NestedDefaultRouter(
    router, r'hatchery', lookup='hatchery')
hatchery_incubation_router.register(r'incubations', views.HatcheryEggViewSet,
                                    basename='api_hatchery_incubations')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),
    path('', include(hatchery_egg_summary_router.urls)),
    path('', include(hatchery_egg_router.urls)),
    path('', include(incubation_summary_router.urls)),
    path('', include(hatchery_incubation_router.urls)),

    path('hatchery/export/<str:export_type>/',
         views.HatcheryExport.as_view(), name="api_hatchery_export"),
    path('hatchery/import/<str:import_type>/',
         views.HatcheryImport.as_view(), name="api_hatchery_import"),

    path('hatchery-eggs/export/<str:export_type>/',
         views.HatcheryEggExport.as_view(), name="api_hatchery_egg_export"),
    path('hatchery-eggs/import/<str:import_type>/',
         views.HatcheryEggImport.as_view(), name="api_hatchery_egg_import"),

    path('incubations/export/<str:export_type>/',
         views.IncubationExport.as_view(), name="api_incubation_export"),
    path('incubations/import/<str:import_type>/',
         views.IncubationImport.as_view(), name="api_incubation_import"),
]
