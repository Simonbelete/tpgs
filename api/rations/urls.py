from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.RationViewSet,
                basename='api_rations'),
router.register(r'<int:id>/ingredients', views.RationIngredientViewSet,
                basename='api_ration_ingredients'),

urlpatterns = [
    path('', include(router.urls))
]
