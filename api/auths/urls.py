from django.urls import path, include

urlpatterns = [
    path(r'auth/reset-password/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
]
