from django.urls import path

from . import views

urlpatterns = [
    path('', views.EggsView.as_view(), name='eggs'),
    path('<int:id>/', views.EggsEditView.as_view(), name='eggs_edit'),
    path('create', views.EggsCreateView.as_view(), name='eggs_create'),
    path('hdep', views.HDEPView.as_view(), name='hdep_report'),
]
