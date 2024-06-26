from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'eggs', views.EggViewSet, basename='api_eggs'),
router.register(r'eggs/(?P<id>.+)/histories',
                views.EggHistoryViewSet, basename='api_eggs_histories'),

urlpatterns = [
    path('', include(router.urls)),
    path('eggs/hdep', views.HHEP.as_view()),
    path('eggs/grading', views.EggGrading.as_view()),
    # path('eggs-layed-hatch', views.EggGrading.as_view()),
]
