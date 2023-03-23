from django.urls import path

from . import views

urlpatterns = [
    path('', views.WeightsView.as_view(), name="weights"),
    path('delete/<int:id>/', views.WeightDeleteView.as_view(), name='weights_delete'),
    path('<int:id>/', views.WeightsEditView.as_view(), name='weights_edit'),
    path('create', views.WeightsCreateView.as_view(), name="weights_create"),
    path('import', views.WeightsImportView.as_view(), name="weights_import"),
    path('growth-performance', views.GrowthPerformanceView.as_view(),
         name="weights_growth_performance")
]
