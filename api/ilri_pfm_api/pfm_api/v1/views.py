from django.contrib.auth import get_user_model
from rest_framework import viewsets
from pfm_api.v1.serializers import UserSerializer, DeviceSerializer
from pfm_api.models import Device

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
