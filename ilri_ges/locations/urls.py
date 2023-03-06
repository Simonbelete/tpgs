from django.urls import path

from . import views

urlpatterns = [
    path('countries', views.CountriesView.as_view(), name='countries'),
    path('countries/<int:id>/', views.CountriesEditView.as_view(),
         name='countries_edit'),
    path('countries/create', views.CountriesCreateView.as_view(),
         name='countries_create'),
    path('cities', views.CitiesView.as_view(), name='cities'),
    path('cities/<int:id>/', views.CitiesEditView.as_view(), name='cities_edit'),
    path('cities/create', views.CitiesCreateView.as_view(), name='cities_create'),
    path('houses', views.HousesView.as_view(), name='houses'),
    path('houses/<int:id>/', views.HousesEditView.as_view(), name='houses_edit'),
    path('houses/create', views.HousesCreateView.as_view(), name='houses_create'),
    path('layed-places', views.LayedPlacesView.as_view(), name='layed_places'),
]
