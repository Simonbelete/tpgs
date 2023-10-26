from django.urls import path, include

from . import views

urlpatterns = [
    path('auth/change-password', views.ChangePasswordViewSet.as_view()),
    path(r'auth/reset-password/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
]
