from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'feeds', views.FeedViewSet, basename='api_feeds'),
router.register(r'feeds/(?P<id>.+)/histories',
                views.FeedHistoryViewSet, basename='api_feeds_histories'),
router.register(r'feeds/types', views.FeedTypeViewSet, basename='api_feeds'),
router.register(r'feeds/types/(?P<id>.+)/histories',
                views.FeedTypeHistoryViewSet, basename='api_feeds_histories'),


urlpatterns = [
    path('', include(router.urls)),
]
