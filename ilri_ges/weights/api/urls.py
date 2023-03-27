from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'weights', views.WeightViewSet, basename='api_weights'),
router.register(r'weights/(?P<id>.+)/histories',
                views.WeightHistoryViewSet, basename='api_weights_histories'),

urlpatterns = [
    path('', include(router.urls)),
    path('weights/growth-performance',  views.get_weight_graph,
         name='api_weights_growth_performance'),
    path('weights/avg', views.WeightAvg.as_view()),
]
