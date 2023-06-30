from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'invitations', views.InvitationViewSet,
                basename='api_invitations'),

urlpatterns = [
    path('', include(router.urls))
]
