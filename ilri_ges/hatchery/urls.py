from django.urls import path

from . import views

urlpatterns = [
    path('', views.HatcheryView.as_view(), name="hatchery"),
    path('delete/<id>/', views.HatcheryDeleteView.as_view(), name="hatchery_delete"),
    path('<id>/', views.HatcheryEditView.as_view(), name="hatchery_edit"),
    path('create', views.HatcheryCreateView.as_view(),
         name="hatchery_create"),
]
