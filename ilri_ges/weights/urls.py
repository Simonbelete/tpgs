from django.urls import path

from . import views

urlpatterns = [
    path('', views.WeightsView.as_view(), name="weights"),
    path('<int:id>/', views.WeightsEditView.as_view(), name='weights_edit'),
    path('create', views.WeightsCreateView.as_view(), name="weights_create"),
    path('import', views.WeightsImportView.as_view(), name="weights_import")
]
