from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path('currencies', views.CurrencyList.as_view()),
]
