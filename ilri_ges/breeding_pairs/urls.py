from django.urls import path

from . import views

urlpatterns = [
    path('', views.BreedPairView.as_view(), name="breeding_pairs"),
    path('<int:id>/', views.BreedPairEditView.as_view(),
         name="breeding_pairs_edit"),
    path('create', views.BreedPairCreateView.as_view(),
         name="breeding_pairs_create"),
]
