from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

from pfm_api.v1.serializers import UserSerializer, DeviceSerializer, FarmSerializer
from pfm_api.models import Device, Farm

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUidViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        try:
            instance = self.queryset.get(uid=pk)
            return Response(self.serializer_class(instance).data,
                            status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class FarmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

    def perform_create(self, serializer):
        print('----------------------------------')
        print(self.request.user)
        serializer.save(created_by=self.request.user)