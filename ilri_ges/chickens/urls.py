from django.urls import path

from . import views

urlpatterns = [
    path('import', views.ChickenImportView.as_view(), name="chickens_import")
]
