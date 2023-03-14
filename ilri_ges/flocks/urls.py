from django.urls import path

from . import views

urlpatterns = [
    path('', views.FlocksView.as_view(), name="flocks"),
    path('<int:id>/', views.FlocksEditView.as_view(), name="flocks_edit"),
    path('create', views.FlocksCreateView.as_view(), name="flocks_create"),
]
