from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'formulas', views.FormulaViewSet,
                basename='api_formulas')

formula_req_router = NestedDefaultRouter(
    router, r'formulas', lookup='formulas')
formula_req_router.register(r'requirements', views.FormulaRequirementViewSet,
                            basename='api_formulas_requirements')

formula_ingredient_router = NestedDefaultRouter(
    router, r'formulas', lookup='formulas')
formula_ingredient_router.register(r'ingredients', views.FormulaIngredientViewSet,
                                   basename='api_formulas_ingredients')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(formula_req_router.urls)),
    path('', include(formula_ingredient_router.urls)),
]