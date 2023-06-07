from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'ingredients', views.IngredientViewSet,
                basename='api_ingredients'),
router.register(r'ingredient-types', views.IngredientTypeViewSet,
                basename='api_ingredient_types'),
# router.register(r'ingredients/(?P<ingredient_pk>.+)/nutrients',
#                 views.IngredientNutrientViewSet, basename='api_ingredient_nutrients')

urlpatterns = [
    path('', include(router.urls))
]
