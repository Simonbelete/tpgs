from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter

from . import views


router = routers.DefaultRouter()

# Nutrient
router.register(r'nutrients', views.NutrientViewSet,
                basename='api_nutrient'),

router.register(r'nutrients/(?P<id>.+)/histories',
                views.NutrientHistoryViewSet, basename='api_nutrients_histories'),

nutrient_summary_router = NestedDefaultRouter(
    router, r'nutrients', lookup='id')

nutrient_summary_router.register(r'summary', views.NutrientSummaryViewSet,
                                 basename='api_nutrient_summary')

# Nutrient Group
router.register(r'nutrient-groups', views.NutrientGroupViewSet,
                basename='api_nutrients_groups'),
router.register(r'nutrient-groups/(?P<id>.+)/histories',
                views.NutrientGroupHistoryViewSet, basename='api_nutrients_groups_histories'),

group_summary_router = NestedDefaultRouter(
    router, r'nutrient-groups', lookup='id')
group_summary_router.register(r'summary', views.NutrientGroupSummaryViewSet,
                              basename='api_nutrient_group_summary')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(nutrient_summary_router.urls)),
    path('', include(group_summary_router.urls)),

    path('nutrients/export/<str:export_type>/',
         views.NutrientExport.as_view(), name="api_nutrient_export"),
    path('nutrients/import/<str:import_type>/',
         views.NutrientImport.as_view(), name="api_nutrient_import"),

    path('nutrient-groups/export/<str:export_type>/',
         views.NutrientExport.as_view(), name="api_nutrient_group_export"),
    path('nutrient-groups/import/<str:import_type>/',
         views.NutrientImport.as_view(), name="api_nutrient_group_import"),
]
