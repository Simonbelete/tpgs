from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'formulas', views.FormulaViewSet,
                basename='api_formulas') 

router.register(
    r'formulas/(?P<id>.+)/nutrients', views.FormulaNutrients, basename="api_formual_nutrients")

router.register(
    r'formulas/(?P<id>.+)/matrix', views.FormulaMatrix, basename="api_formual_matrix")

router.register(r'formulas/(?P<id>.+)/histories',
                views.FormulaHistoryViewSet, basename='api_formula_histories'),

summary_router = NestedDefaultRouter(
    router, r'formulas', lookup='id')
summary_router.register(r'summary', views.FormulaSummaryViewSet,
                        basename='api_formula_summary')


# Formula Requirements
router.register(r'formula-requirements', views.FormulaRequirementViewSet,
                basename='api_requirements')

req_summary_router = NestedDefaultRouter(
    router, r'formula-requirements', lookup='id')
req_summary_router.register(r'summary', views.FormulaRequirementSummaryViewSet,
                            basename='api_req_guideline_summary')

router.register(r'formula-requirements/(?P<id>.+)/histories',
                views.FormulaRequirementHistoryViewSet, basename='api_req_guideline-histories'),

formula_req_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formula_req_router.register(r'requirements', views.FormulaRequirementViewSet,
                            basename='api_formulas_requirements')

all_formula_req_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
all_formula_req_router.register(r'requirements/all', views.AllFormulaRequirementViewSet,
                                basename='api_all_formulas_requirements')

# Formula Rations
router.register(r'formula-rations', views.FormulaRationViewSet,
                basename='api_ration')

req_summary_router = NestedDefaultRouter(
    router, r'formula-rations', lookup='id')
req_summary_router.register(r'summary', views.FormulaRationSummaryViewSet,
                            basename='api_ration_summary')

router.register(r'formula-rations/(?P<id>.+)/histories',
                views.FormulaRationHistoryViewSet, basename='api_ration-histories'),

formula_ration_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formula_ration_router.register(r'rations', views.FormulaRationViewSet,
                               basename='api_formulas_rations')

all_formula_ration_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
all_formula_ration_router.register(r'rations/all', views.AllFormulaRationViewSet,
                                   basename='api_formulas_rations')


# Formula Ingredients

router.register(r'formula-ingredients', views.FormulaIngredientViewSet,
                basename='api_requirements')

ing_summary_router = NestedDefaultRouter(
    router, r'formula-ingredients', lookup='id')
ing_summary_router.register(r'summary', views.FormulaIngredientSummaryViewSet,
                            basename='api_req_guideline_summary')

router.register(r'formula-ingredients/(?P<id>.+)/histories',
                views.FormulaIngredientHistoryViewSet, basename='api_req_guideline-histories'),

formula_ingredient_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
formula_ingredient_router.register(r'ingredients', views.FormulaIngredientViewSet,
                                   basename='api_formulas_ingredients')

all_formula_ingredient_router = NestedDefaultRouter(
    router, r'formulas', lookup='formula')
all_formula_ingredient_router.register(r'ingredients/all', views.AllFormulaIngredientViewSet,
                                       basename='api_all_formulas_ingredients')

#
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


# Example
router.register(r'solve-formula', views.SolveViewSet,
                basename='api_solve_formula')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(all_formula_req_router.urls)),
    path('', include(summary_router.urls)),
    path('', include(req_summary_router.urls)),
    path('', include(formula_req_router.urls)),
    path('', include(ing_summary_router.urls)),
    path('', include(all_formula_ingredient_router.urls)),
    path('', include(formula_ingredient_router.urls)),
    path('', include(formulate_router.urls)),
    path('', include(ingredient_nutrient_router.urls)),
    path('', include(all_formula_ration_router.urls)),
    path('', include(formula_ration_router.urls)),
    path('', include(formulate_print.urls)),
]
