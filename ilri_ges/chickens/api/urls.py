from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'chickens', views.ChickenViewSet, basename='api_chickens')
router.register(r'chickens/(?P<id>.+)/histories',
                views.ChickenHistoryViewSet, basename='api_chickens_histories')
router.register(r'chickens/(?P<id>.+)/eggs',
                views.ChickenEggsviewSet, basename='api_chickens_eggs')
router.register(r'chickens/(?P<id>.+)/feeds',
                views.ChickenFeedsviewSet, basename='api_chickens_eggs')
router.register(r'chickens/(?P<id>.+)/weights',
                views.ChickenWeightsviewSet, basename='api_chickens_weights')
router.register(r'chickens/(?P<id>.+)/statics',
                views.ChickenStaticsViewSet, basename='api_chickens_statics')

urlpatterns = [
    path('chickens/<int:id>/fcr/growth', views.FCrGrowth.as_view()),
    path('chickens/<int:id>/fcr/eggs', views.FCrEgg.as_view()),
    path('chickens/pedigree/', views.ChickenPedigreeViewSet.as_view()),
    path('chickens/mortality-rate/', views.ChickenPedigreeViewSet.as_view()),
    path('', include(router.urls)),
]
