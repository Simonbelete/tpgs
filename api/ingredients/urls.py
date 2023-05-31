from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.IngredientViewSet,
                basename='api_ingredients'),
router.register(r'/types', views.IngredientTypeViewSet,
                basename='api_ingredient_types'),

urlpatterns = [
    path('', include(router.urls))
]
