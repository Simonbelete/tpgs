from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'chickens', views.ChickenViewSet, basename='api_chickens')

urlpatterns = [
    path('chickens/<int:id>/fcr/growth', views.FCrGrowth.as_view()),
    path('', include(router.urls)),
]
