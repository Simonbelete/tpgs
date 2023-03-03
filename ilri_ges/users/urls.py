from django.urls import path

from . import views

urlpatterns = [
    path('', views.UsersView.as_view(), name='users'),
    path('<id>', views.UsersEditView.as_view(), name='users_edit'),
    path('create', views.UsersCreateView.as_view(), name="users_create"),
    path('login', views.LoginView.as_view(), name='login'),
]
