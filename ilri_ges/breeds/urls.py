from django.urls import path

from . import views

urlpatterns = [
    path('', views.BreedsView.as_view(), name="breeds"),
]
