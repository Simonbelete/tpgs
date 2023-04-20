from django.urls import path

from . import views

urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),
    path('pedigree/', views.DashboardPedigreeView.as_view(),
         name='dashboard_pedigree'),
    path('pedigree/full/', views.DashboardPedigreeFullScreenView.as_view(),
         name='dashboard_pedigree_full'),
    path('analysis-anomaly/', views.AnalysisAnomalyWeight.as_view(),
         name='analysis_anomaly'),
    path('analysis-anomaly-feed/', views.AnalysisAnomalyFeed.as_view(),
         name='analysis_anomaly_feed'),
    path('analysis-anomaly-egg/', views.AnalysisAnomalyEgg.as_view(),
         name='analysis_anomaly_egg')
]
