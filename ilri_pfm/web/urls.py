from django.urls import include, path
from web import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_page, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout_page, name='logout'),
    path('home/', views.home, name='home'),

    path('home/users/', views.users, name='users'),
    path('home/users/<id>/', views.user_edit, name='user'),
    path('home/users-create', views.user_edit, name='user'),

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

    path('home/chickens/', views.chickens, name='chickens'),
    path('home/chickens/<id>', views.chickens_edit, name='chicken'),
    path('home/chickens-create', views.chickens_edit,
         name='chicken_create'),

    path('home/feeds/', views.feeds, name='feeds'),
    path('home/feeds/<id>', views.feed_edit, name='feed'),
    path('home/feeds-create', views.feed_edit,
         name='feed_create'),

    path('home/eggs/', views.eggs, name='eggs'),
    path('home/eggs/<id>', views.egg_edit, name='egg'),
    path('home/eggs-create', views.egg_edit,
         name='egg_create'),

    path('home/flocks/', views.flocks, name='flocks'),
    path('home/flocks/<id>', views.flock_edit, name='flock'),
    path('home/flocks-create', views.flock_edit,
         name='flock_create'),

    path('home/weights/', views.weights, name='weights'),
    path('home/weights/<id>', views.weight_edit, name='weight'),
    path('home/weights-create', views.weight_edit,
         name='weight_create'),
]
