from django.urls import include, path
from rest_framework import routers

from .views import StaticsviewSet, AnalysisWeight, AnalysisFeed, AnalysisEgg, analysis_weight_graph, analysis_feed_graph, analysis_egg_graph

router = routers.DefaultRouter()

router.register(r'dashboard/statics',
                StaticsviewSet, basename='api_dashboard_statics')

urlpatterns = [
    path('', include(router.urls)),
    path('anomaly/weights/', AnalysisWeight.as_view()),
    path('anomaly/weights/graph/', analysis_weight_graph),

    path('anomaly/feed/', AnalysisFeed.as_view()),
    path('anomaly/feed/graph/', analysis_feed_graph),

    path('anomaly/egg/', AnalysisEgg.as_view()),
    path('anomaly/egg/graph/', analysis_egg_graph),
]
