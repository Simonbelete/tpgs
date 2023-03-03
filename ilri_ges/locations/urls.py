from django.urls import path

from . import views

urlpatterns = [
    path('countries', views.CountriesView.as_view(), name='countries'),
    path('countries/<id>/', views.CountriesEditView.as_view(), name='countries_edit'),
    path('countries/create', views.CountriesCreateView.as_view(),
         name='countries_create'),
    path('cities', views.CitiesView.as_view(), name='cities'),
    path('cities/<id>/', views.CitiesEditView.as_view(), name='cities_edit'),
    path('cities/create', views.CitiesCreateView.as_view(), name='cities_create'),
    path('houses', views.HousesView.as_view(), name='houses'),
    path('layed-places', views.LayedPlacesView.as_view(), name='layed_places'),
]
