from django.urls import include, path
from rest_framework import routers

from .views import StaticsviewSet, analysis_weight

router = routers.DefaultRouter()

router.register(r'dashboard/statics',
                StaticsviewSet, basename='api_dashboard_statics')

urlpatterns = [
    path('', include(router.urls)),
    path('analysis/weights/', analysis_weight),
]
