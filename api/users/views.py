from django.shortcuts import render
from django.contrib.auth.models import Group, Permission
from rest_framework import viewsets, status
from . import models
from . import serializers
from core.utils import multi_farm_from_request, farm_from_request


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = serializers.PermissionSerializer_GET


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer_GET


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer_GET

    # def get_queryset(self):
    #     return self.queryset.filter(farms__in=[self.request.tenant.id])
    # return multi_farm_from_request(self.request, self.queryset)
