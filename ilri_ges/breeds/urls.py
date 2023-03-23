from django.urls import path

from . import views

urlpatterns = [
    path('', views.BreedsView.as_view(), name="breeds"),
    path('delete/<int:id>/', views.BreedTypesDeleteView.as_view(),
         name="breeds_delete"),
    path('<int:id>/', views.BreedsEditView.as_view(), name="breeds_edit"),
    path('create', views.BreedsCreateView.as_view(), name="breeds_create"),
]
