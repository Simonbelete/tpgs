from django.urls import include, path
from rest_framework import routers

from .views import StaticsviewSet

router = routers.DefaultRouter()

router.register(r'dashboard/statics',
                StaticsviewSet, basename='api_dashboard_statics')


urlpatterns = [
    path('', include(router.urls)),
]
