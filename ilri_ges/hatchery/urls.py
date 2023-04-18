from django.urls import path

from . import views

urlpatterns = [
    path('', views.HatcheryView.as_view(), name="hatchery"),
    path('delete/<id>/', views.HatcheryDeleteView.as_view(), name="hatchery_delete"),
    path('<id>/', views.HatcheryEditView.as_view(), name="hatchery_edit"),
    path('create', views.HatcheryCreateView.as_view(),
         name="hatchery_create"),

    path('', views.IncubationView.as_view(), name="incubation"),
    path('delete/<id>/', views.IncubationDeleteView.as_view(),
         name="incubation_delete"),
    path('<id>/', views.IncubationEditView.as_view(), name="incubation_edit"),
    path('create', views.IncubationCreateView.as_view(),
         name="incubation_create"),

    path('', views.CandlingView.as_view(), name="candling"),
    path('delete/<id>/', views.CandlingDeleteView.as_view(),
         name="candling_delete"),
    path('<id>/', views.CandlingEditView.as_view(), name="candling_edit"),
    path('create', views.CandlingCreateView.as_view(),
         name="candling_create"),
]
