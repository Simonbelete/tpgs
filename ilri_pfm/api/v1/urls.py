from django.urls import include, path
from rest_framework import routers

from api.v1 import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='users')
router.register(r'countries', views.CountryViewSet, basename='countries')
router.register(r'cities', views.CityViewSet, basename='cities')
router.register(r'farms', views.FarmViewSet, basename='farms')
router.register(r'farms/(?P<id>.+)/histories',
                views.FarmHistoryViewSet, basename='farms_history')
router.register(r'houses', views.HouseViewSet, basename='houses')
router.register(r'breed-types', views.BreedTypeViewSet, basename='breed_types')
router.register(r'stages', views.StageViewSet, basename='stages')
router.register(r'layed-places', views.LayedPlaceViewSet,
                basename='layed_places')
router.register(r'chickens', views.ChickenViewSet,
                basename='chickens')
router.register(r'chickens/(?P<id>.+)/statics',
                views.ChickenStaticsViewSet, basename='chickens_statics')
router.register(r'chickens/(?P<id>.+)/weights',
                views.ChickenWeightsViewSet, basename='chickens_weights')
router.register(r'chickens/(?P<id>.+)/histories',
                views.ChickenHistoryViewSet, basename='chickens_history')
router.register(r'breed-pairs', views.BreedPairViewSet, basename='breed_pairs')
router.register(r'weights', views.WeightViewSet, basename='weights')
router.register(r'weights/(?P<id>.+)/histories',
                views.WeightHistoryViewSet, basename='weights_history')
router.register(r'eggs', views.EggViewSet, basename='eggs')
router.register(r'feed-types', views.FeedTypeViewSet, basename='feed_types')
router.register(r'feeds', views.FeedViewSet, basename='feeds')
router.register(r'feeds/(?P<id>.+)/histories',
                views.FeedHistoryViewSet, basename='feeds_history')
router.register(r'flocks', views.FlockViewSet, basename='flocks')
router.register(r'flocks/(?P<id>.+)/histories',
                views.FlockHistoryViewSet, basename='flocks_history')
router.register(r'statics/count', views.StaticsCount, basename='statics_count')
router.register(r'statics/breed-types', views.StaticsBreedType,
                basename='statics_breed_types')


urlpatterns = [
    path('', include(router.urls)),
    path('reports/weight',  views.get_weight_graph, name='weights_report')
]
