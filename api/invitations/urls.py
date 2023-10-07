from django.urls import path, include
from rest_framework import routers
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from . import views

router = routers.DefaultRouter()
router.register(r'invitations', views.InvitationViewSet,
                basename='api_invitations')
verify_router = routers.DefaultRouter()
verify_router.register(r'verify-invitation', views.VerifyInvitationViewSet,
                       basename='api_verify_invitations')

resend_router = routers.DefaultRouter()
resend_router.register(
    r'invitations/(?P<id>.+)/resend', views.ResendInvitationViewSet, basename="api_resend_invitaiton")


urlpatterns = [
    path('', include(router.urls)),
    path('', include(verify_router.urls)),
    path('', include(resend_router.urls))
]
