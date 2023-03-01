from django.urls import path

from . import views

urlpatterns = [
    path('countries', views.CountriesView.as_view(), name='countries'),
]
