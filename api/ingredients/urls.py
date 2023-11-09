from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()

# Ingredients
router.register(r'ingredients', views.IngredientViewSet,
                basename='api_ingredients')

router.register(r'ingredients/(?P<id>.+)/histories',
                views.IngredientHistoryViewSet, basename='api_ingredient_histories'),

summary_router = NestedDefaultRouter(
    router, r'ingredients', lookup='id')
summary_router.register(r'summary', views.IngredientSummaryViewSet,
                        basename='api_ingredients_summary')

ingredient_nutrients_router = NestedDefaultRouter(
    router, r'ingredients', lookup='ingredient')
ingredient_nutrients_router.register(r'nutrients', views.IngredientNutrientViewSet,
                                     basename='api_ingredient_nutrients')

router.register(r'ingredients/(?P<id>.+)/analyses', views.IngredientAnalysesViewSet,
                basename='api_ingredient_analyses')

# Ingredient Types
router.register(r'ingredient-types', views.IngredientTypeViewSet,
                basename='api_ingredient_types'),
router.register(r'ingredients/(?P<ingredient_pk>.+)/nutrients',
                views.IngredientNutrientViewSet, basename='api_ingredient_nutrients')

summary_ing_type_router = NestedDefaultRouter(
    router, r'ingredient-types', lookup='id')
summary_ing_type_router.register(r'summary', views.IngredientTypeSummaryViewSet,
                                 basename='api_ingredient_types_summary')

# Ingredient Nutrients
router.register(r'ingredient-nutrients', views.IngredientNutrientViewSet,
                basename='api_ingredient_nutrients')

router.register(r'ingredients/(?P<id>.+)/histories',
                views.IngredientNutrientHistoryViewSet, basename='api_ingredient_histories'),

ing_nutr_summary_router = NestedDefaultRouter(
    router, r'ingredients', lookup='id')
ing_nutr_summary_router.register(r'summary', views.IngredientNutrientSummaryViewSet,
                                 basename='api_ingredients_nutreints_summary')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(ingredient_nutrients_router.urls)),
    path('', include(summary_router.urls)),
    path('', include(summary_ing_type_router.urls)),

    path('ingredients/export/<str:export_type>/',
         views.IngredientExport.as_view(), name="api_ingredient_export"),
    path('ingredients/import/<str:import_type>/',
         views.IngredientImport.as_view(), name="api_ingredient_import"),

    path('ingredient-types/export/<str:export_type>/',
         views.IngredientTypeExport.as_view(), name="api_ingredient_type_export"),
    path('ingredient-types/import/<str:import_type>/',
         views.IngredientTypeImport.as_view(), name="api_ingredient_type_import"),

    path('ingredient-nutrients/export/<str:export_type>/',
         views.IngredientNutrientExport.as_view(), name="api_ingredient_nutrient_export"),
    path('ingredient-nutrients/import/<str:import_type>/',
         views.IngredientNutrientImport.as_view(), name="api_ingredient_nutrient_import"),
]
