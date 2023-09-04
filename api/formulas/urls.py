from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'formulas', views.FormulaViewSet,
                basename='api_formulas')

formula_req_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formula_req_router.register(r'requirements', views.FormulaRequirementViewSet,
                            basename='api_formulas_requirements')

formula_ration_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formula_ration_router.register(r'rations', views.FormulaRationViewSet,
                               basename='api_formulas_rations')

formula_ingredient_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formula_ingredient_router.register(r'ingredients', views.FormulaIngredientViewSet,
                                   basename='api_formulas_ingredients')
formulate_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formulate_router.register(r'formulate', views.FormulateViewSet,
                          basename='api_formula_formulate')

formulate_print = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formulate_print.register(r'print/pdf', views.FormulaPrintPdf,
                          basename='api_formula_formulate')

ingredient_nutrient_router = NestedDefaultRouter(
    formula_ingredient_router, r'ingredients', lookup='ingredient')
ingredient_nutrient_router.register(r'nutrients', views.FormulaIngredientNutrients,
                                    basename='api_formula_ingredient_nutrients')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(formula_req_router.urls)),
    path('', include(formula_ingredient_router.urls)),
    path('', include(formulate_router.urls)),
    path('', include(ingredient_nutrient_router.urls)),
    path('', include(formula_ration_router.urls)),
    path('', include(formulate_print.urls)),
]
