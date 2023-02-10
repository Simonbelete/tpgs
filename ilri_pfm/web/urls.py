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
    path('home/feed-types/', views.feed_types, name='feed_types'),
    path('home/feed-types/<id>', views.feed_type_edit, name='feed_type'),
    path('home/feed-types-create', views.feed_type_edit, name='feed_type_create'),
]
