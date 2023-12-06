from django.urls import path, include
from rest_framework_nested.routers import NestedDefaultRouter
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'requirements', views.RequirementViewSet,
                basename='api_requirement'),

router.register(r'requirements/(?P<id>.+)/analyses', views.RequirementAnalysesViewSet,
                basename='api_requirement_analyses')

router.register(r'requirements/(?P<id>.+)/histories',
                views.RequirementHistoryViewSet, basename='api_requirement_histories'),

summary_router = NestedDefaultRouter(
    router, r'requirements', lookup='id')
summary_router.register(r'summary', views.RequirementSummaryViewSet,
                        basename='api_requirement_summary')

# Requirement Nutrients
router.register(r'requirement-nutrients', views.RequirementNutrientViewSet,
                basename='api_requirement_all_nutrients'),

router.register(r'requirement-nutrients/(?P<id>.+)/histories',
                views.RequirementNutrientHistoryViewSet, basename='api_requirement_nutrient_histories'),

req_summary_router = NestedDefaultRouter(
    router, r'requirement-nutrients', lookup='id')
req_summary_router.register(r'summary', views.RequirementNutrientSummaryViewSet,
                            basename='api_requirement_nutrient_summary')

all_nutrient_router = NestedDefaultRouter(
    router, r'requirements', lookup='requirement')
all_nutrient_router.register(r'nutrients/all', views.AllRequirementNutrientViewSet,
                             basename='api_all_requirement_nutrients')

nutrient_router = NestedDefaultRouter(
    router, r'requirements', lookup='requirement')
nutrient_router.register(r'nutrients', views.RequirementNutrientViewSet,
                         basename='api_requirement_nutrients')

# Requirement Ingredient
router.register(r'requirement-ingredients', views.RequirementIngredientViewSet,
                basename='api_requirement_all_ingredient'),

router.register(r'requirement-ingredients/(?P<id>.+)/histories',
                views.RequirementIngredientHistoryViewSet, basename='api_requirement_ingredints_histories'),

ing_summary_router = NestedDefaultRouter(
    router, r'requirement-ingredients', lookup='id')
ing_summary_router.register(r'summary', views.RequirementIngredientSummaryViewSet,
                            basename='api_requirement_ingredient_summary')

all_ing_router = NestedDefaultRouter(
    router, r'requirements', lookup='requirement')
all_ing_router.register(r'ingredients/all', views.AllRequirementIngredientViewSet,
                        basename='api_all_requirement_ingredients')

req_ing_router = NestedDefaultRouter(
    router, r'requirements', lookup='requirement')
req_ing_router.register(r'ingredients', views.RequirementIngredientViewSet,
                        basename='api_requirement_nutrients')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(summary_router.urls)),
    path('', include(all_nutrient_router.urls)),
    path('', include(nutrient_router.urls)),
    path('', include(req_summary_router.urls)),

    path('', include(all_ing_router.urls)),
    path('', include(req_ing_router.urls)),
    path('', include(ing_summary_router.urls)),

    path('requirements/export/<str:export_type>/',
         views.RequirementExport.as_view(), name="api_requirement_export"),
    path('requirements/import/<str:import_type>/',
         views.RequirementImport.as_view(), name="api_requirement_import"),

    path('requirement-nutrients/export/<str:export_type>/',
         views.RequirementNutrientExport.as_view(), name="api_requirement_nutrient_export"),
    path('requirement-nutrients/import/<str:import_type>/',
         views.RequirementNutrientImport.as_view(), name="api_requirement_nutrient_import"),

    path('requirement-ingredients/export/<str:export_type>/',
         views.RequirementIngredientExport.as_view(), name="api_requirement_ingredient_export"),
    path('requirement-ingredients/import/<str:import_type>/',
         views.RequirementIngredientImport.as_view(), name="api_requirement_ingredient_import"),
]
