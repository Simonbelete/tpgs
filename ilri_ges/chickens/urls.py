from django.urls import path

from . import views

urlpatterns = [
    path('', views.ChickenView.as_view(), name="chickens"),
    path('import', views.ChickenImportView.as_view(), name="chickens_import")
]
