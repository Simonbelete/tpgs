from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'', views.RecipeViewSet,
                basename='api_recipes'),


urlpatterns = [
    path('', include(router.urls))
]
