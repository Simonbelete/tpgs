from django.urls import include, path
from web import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),
    path('home/', views.home, name='home'),
    path('home/users/', views.users, name='users'),
    path('home/users/<id>/', views.user_edit, name='user'),
]
