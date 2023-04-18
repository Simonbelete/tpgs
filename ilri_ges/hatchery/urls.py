from django.urls import path

from . import views

urlpatterns = [
    path('', views.HatcheryView.as_view(), name="hatchery"),
    path('delete/<int:id>/', views.HatcheryDeleteView.as_view(),
         name="hatchery_delete"),
    path('<int:id>/', views.HatcheryEditView.as_view(), name="hatchery_edit"),
    path('<int:id>/incubation/', views.HatcheryIncubation.as_view(),
         name="hatchery_incubation"),
    path('<int:id>/candling/', views.HatcheryCandling.as_view(),
         name="hatchery_candling"),
    path('create', views.HatcheryCreateView.as_view(),
         name="hatchery_create"),

    path('incubation/', views.IncubationView.as_view(), name="incubation"),
    path('incubation/delete/<id>/', views.IncubationDeleteView.as_view(),
         name="incubation_delete"),
    path('incubation/<id>/', views.IncubationEditView.as_view(),
         name="incubation_edit"),
    path('incubation/create', views.IncubationCreateView.as_view(),
         name="incubation_create"),

    path('candling/', views.CandlingView.as_view(), name="candling"),
    path('candling/delete/<id>/', views.CandlingDeleteView.as_view(),
         name="candling_delete"),
    path('candling/<id>/', views.CandlingEditView.as_view(), name="candling_edit"),
    path('candling/create', views.CandlingCreateView.as_view(),
         name="candling_create"),
]
