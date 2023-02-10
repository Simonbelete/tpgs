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

    path('home/layed-places/', views.layed_place, name='layed_places'),
    path('home/layed-places/<id>', views.layed_place_edit, name='layed_place'),
    path('home/layed-places-create', views.layed_place_edit,
         name='layed_places_create'),
]
