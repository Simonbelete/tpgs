from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'auth/change-password', views.ChangePasswordViewSet,
                basename='api_change_password')
router.register(r'auth/deactivate', views.DeactivateAccountViewSet,
                basename='api_deactivate_account')

urlpatterns = [
    path('', include(router.urls)),
    path(r'auth/reset-password/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
]
