from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'ingredients', views.IngredientViewSet,
                basename='api_ingredients')

router.register(r'ingredients/(?P<id>.+)/analyses', views.IngredientAnalysesViewSet,
                basename='api_ingredient_analyses')

summary_router = NestedDefaultRouter(
    router, r'ingredients', lookup='id')
summary_router.register(r'summary', views.IngredientSummaryViewSet,
                        basename='api_ingredients_summary')

router.register(r'ingredient-types', views.IngredientTypeViewSet,
                basename='api_ingredient_types'),
router.register(r'ingredients/(?P<ingredient_pk>.+)/nutrients',
                views.IngredientNutrientViewSet, basename='api_ingredient_nutrients')

summary_ing_type_router = NestedDefaultRouter(
    router, r'ingredient-types', lookup='id')
summary_ing_type_router.register(r'summary', views.IngredientTypeSummaryViewSet,
                        basename='api_ingredient_types_summary')

ingredient_nutrients_router = NestedDefaultRouter(
    router, r'ingredients', lookup='ingredient')
ingredient_nutrients_router.register(r'nutrients', views.IngredientNutrientViewSet,
                                     basename='api_ingredient_nutrients')

nutrient_router = routers.DefaultRouter()
nutrient_router.register(r'ingredient-nutrients', views.AllIngredientNutrientViewSet,
                basename='api_ingredient_nutrients')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(ingredient_nutrients_router.urls)),
    path('', include(summary_router.urls)),
    path('', include(summary_ing_type_router.urls)),
    path('', include(nutrient_router.urls)),

    path('ingredients/export/', include([
          path('xlsx', views.IngredientXlsxExport.as_view(),
              name="ingredients_export_xlsx"),
          path('xls', views.IngredientXlsExport.as_view(),
               name="ingredients_export_xls"),
          path('csv', views.IngredientCsvExport.as_view(),
               name="ingredients_export_csv"),
     ])),

     path('ingredients/import/', include([
          path('xlsx', views.IngredientXlsxImport.as_view(),
              name="ingredients_import_xlsx"),
          path('xls', views.IngredientXlsImport.as_view(),
               name="ingredients_import_xls"),
          path('csv', views.IngredientCsvImport.as_view(),
               name="ingredients_import_csv")
    ])),

    path('ingredient-types/export/', include([
          path('xlsx', views.IngredientTypeXlsxExport.as_view(),
              name="ingredient_types_export_xlsx"),
          path('xls', views.IngredientTypeXlsExport.as_view(),
               name="ingredient_types_export_xls"),
          path('csv', views.IngredientTypeCsvExport.as_view(),
               name="ingredient_types_export_csv"),
     ])),

     path('ingredient-types/import/', include([
          path('xlsx', views.IngredientTypeXlsxImport.as_view(),
              name="ingredient_types_import_xlsx"),
          path('xls', views.IngredientTypeXlsImport.as_view(),
               name="ingredient_types_import_xls"),
          path('csv', views.IngredientTypeCsvImport.as_view(),
               name="ingredient_types_import_csv")
    ])),
     
      path('ingredient-nutrients/export/', include([
          path('xlsx', views.IngredientNutrientXlsxExport.as_view(),
              name="ingredient_nutrients_export_xlsx"),
          path('xls', views.IngredientNutrientXlsExport.as_view(),
               name="ingredient_nutrients_export_xls"),
          path('csv', views.IngredientNutrientCsvExport.as_view(),
               name="ingredient_nutrients_export_csv"),
     ])),

     path('ingredient-nutrients/import/', include([
          path('xlsx', views.IngredientNutrientXlsxImport.as_view(),
              name="ingredient_nutrients_import_xlsx"),
          path('xls', views.IngredientNutrientXlsImport.as_view(),
               name="ingredient_nutrients_import_xls"),
          path('csv', views.IngredientNutrientCsvImport.as_view(),
               name="ingredient_nutrients_import_csv")
    ])),
]
