from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'', views.FeedViewSet, basename='api_feeds'),
router.register(r'(?P<id>.+)/histories',
                views.FeedHistoryViewSet, basename='api_feeds_histories'),

router_types = routers.DefaultRouter()
router_types.register(r'', views.FeedTypeViewSet, basename='api_feeds_types'),
router_types.register(r'(?P<id>.+)/histories',
                      views.FeedTypeHistoryViewSet, basename='api_feeds_types_histories'),


urlpatterns = [
    path('feeds/types/', include(router_types.urls)),
    path('feeds/', include(router.urls)),
]
