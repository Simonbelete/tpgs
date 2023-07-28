from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from rest_framework_extensions.routers import ExtendedSimpleRouter

from . import views

router = routers.DefaultRouter()
router.register(r'ingredients', views.IngredientViewSet,
                basename='api_ingredients'),
router.register(r'ingredient-types', views.IngredientTypeViewSet,
                basename='api_ingredient_types'),
router.register(r'ingredients/(?P<ingredient_pk>.+)/nutrients',
                views.IngredientNutrientViewSet, basename='api_ingredient_nutrients')

ingredient_nutrients_router = NestedDefaultRouter(
    router, r'ingredients', lookup='ingredient')
ingredient_nutrients_router.register(r'nutrients', views.IngredientNutrientViewSet,
                                     basename='api_ingredient_nutrients')
urlpatterns = [
    path('', include(router.urls)),
    path('', include(ingredient_nutrients_router.urls)),
]
