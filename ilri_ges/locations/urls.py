from django.urls import path

from . import views

urlpatterns = [
    path('countries', views.CountriesView.as_view(), name='countries'),
    path('cities', views.CitiesView.as_view(), name='cities'),
    path('houses', views.HousesView.as_view(), name='houses'),
    path('layed-places', views.LayedPlacesView.as_view(), name='layed_places'),
]
