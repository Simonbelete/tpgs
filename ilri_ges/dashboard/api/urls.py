from django.urls import include, path
from rest_framework import routers

from .views import StaticsviewSet, AnalysisWeight, analysis_weight_graph

router = routers.DefaultRouter()

router.register(r'dashboard/statics',
                StaticsviewSet, basename='api_dashboard_statics')

urlpatterns = [
    path('', include(router.urls)),
    path('anomaly/weights/', AnalysisWeight.as_view()),
    path('anomaly/weights/graph/', analysis_weight_graph),
]
