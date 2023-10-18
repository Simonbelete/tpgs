from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'hatchery', views.FormulaViewSet,
                basename='api_formulas')

hatchery_egg_router = NestedDefaultRouter(
    router, r'hatchery', lookup='hatchery')
hatchery_egg_router.register(r'eggs', views.HatcheryEggViewSet,
                            basename='api_hatchery_eggs')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(hatchery_egg_router.urls)),
]