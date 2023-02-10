from django.urls import include, path
from rest_framework import routers

from api.v1 import views

router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='countries')
router.register(r'cities', views.CityViewSet, basename='cities')
router.register(r'farms', views.FarmViewSet, basename='farms')
router.register(r'houses', views.HouseViewSet, basename='houses')
router.register(r'breed-types', views.BreedTypeViewSet, basename='breed_types')
router.register(r'stages', views.StageViewSet, basename='stages')
router.register(r'layed-places', views.LayedPlaceViewSet,
                basename='layed_places')
router.register(r'chickens', views.ChickenViewSet, basename='chickens')
router.register(r'breed-pairs', views.BreedPairViewSet, basename='breed_pairs')
router.register(r'weights', views.WeightViewSet, basename='weights')
router.register(r'eggs', views.EggViewSet, basename='eggs')
router.register(r'feed-types', views.FeedTypeViewSet, basename='feed_types')
router.register(r'feeds', views.FeedViewSet, basename='feeds')


urlpatterns = [
    path('', include(router.urls))
]
