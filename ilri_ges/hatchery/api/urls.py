from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'hatchery', views.HatcheryViewSet,
                basename='api_hatchery')
router.register(r'incubation', views.IncubationViewSet,
                basename='api_incubation')
router.register(r'candling', views.CandlingViewSet,
                basename='api_candling')
router.register(r'hatchery/(?P<id>.+)/incubation', views.HatcheryIncubation,
                basename='api_hatchery_incubation')
router.register(r'hatchery/(?P<id>.+)/candling', views.HatcheryCandling,
                basename='api_hatchery_candling')

urlpatterns = [
    path('', include(router.urls)),
]
