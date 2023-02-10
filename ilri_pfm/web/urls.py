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

    path('home/stages/', views.stages, name='stages'),
    path('home/stages/<id>', views.stage_edit, name='stage'),
    path('home/stages-create', views.stage_edit,
         name='stage_create'),

    path('home/breed-types/', views.breed_types, name='breed_types'),
    path('home/breed-types/<id>', views.breed_type_edit, name='breed_type'),
    path('home/breed-types-create', views.breed_type_edit,
         name='breed_type_create'),

    path('home/farms/', views.farms, name='farms'),
    path('home/farms/<id>', views.farm_edit, name='farm'),
    path('home/farms-create', views.farm_edit,
         name='farm_create'),
]
