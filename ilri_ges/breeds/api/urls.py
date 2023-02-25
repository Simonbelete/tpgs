from django.urls import include, path
from rest_framework import routers

from breeds.api import views

router = routers.DefaultRouter()
router.register(r'breed-types', views.BreedTypeViewSet,
                basename='api_breed_types')

urlpatterns = [
    path('', include(router.urls)),
]
