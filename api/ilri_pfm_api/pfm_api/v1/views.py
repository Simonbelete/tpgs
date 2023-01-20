from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from django.http import HttpResponse
from pfm_api.v1.serializers import UserSerializer
from pfm_api.models import UserProfile
from pfm_api.permissions import CheckApiKey

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [CheckApiKey]
    queryset = UserProfile.objects.all()
