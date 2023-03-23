from django.urls import path

from . import views

urlpatterns = [
    path('', views.FarmsView.as_view(), name="farms"),
    path('delete/<id>/', views.FarmDeleteView.as_view(), name="farms_delete"),
    path('<id>/', views.FarmsEditView.as_view(), name="farms_edit"),
    path('create', views.FarmsCreateView.as_view(),
         name="farms_create"),
]
