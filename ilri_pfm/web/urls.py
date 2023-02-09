from django.urls import include, path
from web import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sign-in/', views.signIn, name='singin')
]
