from django.urls import path

from . import views

urlpatterns = [
    path('', views.ChickenView.as_view(), name="chickens"),
    path('<int:id>/', views.ChickenEditView.as_view(), name="chickens_edit"),
    path('create', views.ChickenCreateView.as_view(), name="chickens_create"),
    path('import', views.ChickenImportView.as_view(), name="chickens_import")
]
