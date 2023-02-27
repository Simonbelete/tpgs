from django.urls import path

from . import views

urlpatterns = [
    path('', views.UserView.as_view(), name='users'),
    path('create', views.UserView.as_view(), name="users_create"),
    path('login', views.LoginView.as_view(), name='login'),
]
