from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework.exceptions import NotFound

from . import models
from . import serializers
from . import filters
from .tasks import send_invitation_email
from users.models import User
from users.serializers import UserSerializer_GET

class InvitationViewSet(viewsets.ModelViewSet):
    queryset = models.Invitation.objects.all()
    serializer_class = serializers.InvitationSerializer_GET
    filterset_class = filters.InvitationFilter
    search_fields = ['email']
    ordering_fields = '__all__'

    def get_queryset(self):
        superuser_mode = self.request.headers.get('X-Superuser-Mode', 'false')
        superuser_mode = eval(superuser_mode.capitalize())
        if (superuser_mode and self.request.user.is_superuser):
            return super().get_queryset()
        return super().get_queryset().filter(inviter=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.InvitationSerializer_POST
        return serializers.InvitationSerializer_GET

    def perform_create(self, serializer):
        serializer.save(inviter=self.request.user)

class VerifyInvitationViewSet(viewsets.ViewSet):
    serializer_class = serializers.VerifyInvitationSerializer_POST

    def get_queryset(self):
        return models.Invitation.objects.all()

    @transaction.atomic
    def create(self, request):
        try:
            with transaction.atomic():
                token = request.data['token']
                password = request.data['password']
                name = request.data['name']
                invitation = models.Invitation.objects.get(token=token)
                if(invitation.expire_date < timezone.now().date()):
                    return Response({
                        'error': 'token expired'
                    }, status=400)

                user = User.objects.create_user(
                    invitation.email, password, name=name)
                for farm in invitation.farms.all().iterator():
                    user.farms.add(farm)
                    user.save()
                invitation.accepted = True
                invitation.save()
                serializer = UserSerializer_GET(user)
                return Response(serializer.data, status=201)
        except models.Invitation.DoesNotExist:
            return Response({
                'message': 'Token is not valid',
                'errors': {
                    'token': ['The given token is not valid']
                }
                },status=400)
        except ValidationError as ex:
            return Response({
                'message': 'Invalid input',
                'errors': ex,
            },status=400)
        except Exception as ex:
            return Response({'error': str(ex)}, status=500)

class ResendInvitationViewSet(viewsets.ViewSet):
    def create(self, request, id=None):
        try:
            invitation = models.Invitation.objects.get(pk=id)
            send_invitation_email.delay(invitation.inviter.id, invitation.email, invitation.token)
            return Response({}, status=200)
        except models.Invitation.DoesNotExist:
            raise NotFound()
        except Exception as ex:
            print('----')
            print(ex)
            return Response({}, status=500)