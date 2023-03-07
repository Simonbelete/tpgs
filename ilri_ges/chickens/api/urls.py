from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'chickens', views.ChickenViewSet, basename='api_chickens')
router.register(r'chickens/(?P<id>.+)/histories',
                views.ChickenHistoryViewSet, basename='api_chickens_histories')

urlpatterns = [
    path('chickens/<int:id>/fcr/growth', views.FCrGrowth.as_view()),
    path('chickens/<int:id>/fcr/eggs', views.FCrEgg.as_view()),
    path('', include(router.urls)),
]
