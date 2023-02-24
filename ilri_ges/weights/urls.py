from django.urls import path

from . import views

urlpatterns = [
    path('', views.WeightsView.as_view(), name="weights"),
    path('create', views.WeightsCreateView.as_view(), name="weights_create")
]
