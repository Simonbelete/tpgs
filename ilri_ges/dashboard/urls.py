from django.urls import path

from . import views

urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),
    path('pedigree', views.DashboardPedigreeView.as_view(),
         name='dashboard_pedigree'),
    path('pedigree/full', views.DashboardPedigreeFullScreenView.as_view(),
         name='dashboard_pedigree_full')
]
