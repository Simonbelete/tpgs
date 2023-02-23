from django.urls import path

from . import views

urlpatterns = [
    path('', views.UserView.as_view(), name='users'),
    path('login', views.LoginView.as_view(), name='login'),
]
