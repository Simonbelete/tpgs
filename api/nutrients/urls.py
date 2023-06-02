from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'nutrients', views.NutrientViewSet,
                basename='api_nutrients'),
router.register(r'nutrient-groups', views.NutrientGroupViewSet,
                basename='api_nutrients_groups'),

urlpatterns = [
    path('', include(router.urls))
]
