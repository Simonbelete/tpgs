from django.urls import path, include
from rest_framework import routers
from rest_framework_nested.routers import NestedDefaultRouter
from . import views

router = routers.DefaultRouter()
router.register(r'feeds', views.FeedViewSet,
                basename='api_feeds')
router.register(r'feeds/(?P<id>.+)/histories',
                views.FeedHistoryViewSet, basename='api_feeds_histories'),

summary_router = NestedDefaultRouter(
    router, r'feeds', lookup='id')
summary_router.register(r'summary', views.FeedSummaryViewSet,
                        basename='api_feeds_summary')

urlpatterns = [
    path('', include(router.urls)),

    path('feeds/export/<str:export_type>/',
         views.FeedExport.as_view(), name="api_feed_export"),
    path('feeds/import/<str:import_type>/',
         views.FeedImport.as_view(), name="api_feed_import"),
]
