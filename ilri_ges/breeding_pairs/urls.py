from django.urls import path

from . import views

urlpatterns = [
    path('', views.BreedPairView.as_view(), name="breeding_pairs"),
    path('create', views.BreedPairCreateView.as_view(),
         name="breeding_pairs_create"),
]
