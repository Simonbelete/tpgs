from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'hatchery', views.HatcheryViewSet,
                basename='api_hatchery')

hatchery_egg_router = NestedDefaultRouter(
    router, r'hatchery', lookup='hatchery')
hatchery_egg_router.register(r'eggs', views.HatcherysEggViewSet,
                            basename='api_hatchery_eggs')

eggs_router = routers.DefaultRouter()
eggs_router.register(r'hatchery-eggs', views.HatcheryEggViewSet,
                basename='api_hatchery_eggs_list')

incubations_router = routers.DefaultRouter()
incubations_router.register(r'incubations', views.IncubationViewSet,
                basename='api_incubation_list')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(hatchery_egg_router.urls)),
    path('', include(eggs_router.urls)),
    path('', include(incubations_router.urls))
]