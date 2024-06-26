from django.shortcuts import render
from django.contrib.auth.models import Group, Permission
from rest_framework import viewsets, mixins
from core.utils import multi_farm_from_request, farm_from_request
from django.db.models import Q

from . import models
from . import serializers
from . import filters


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = serializers.PermissionSerializer_GET


class GroupViewSet(mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer_GET


class UserViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = models.User.all.all()
    serializer_class = serializers.UserSerializer_GET
    filterset_class = filters.UserFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_queryset(self):
        superuser_mode = self.request.headers.get('X-Superuser-Mode', 'false')
        superuser_mode = eval(superuser_mode.capitalize())
        if (superuser_mode and self.request.user.is_superuser):
            return super().get_queryset()  # .filter(~Q(pk=self.request.user.id))
        # TODO:
        # .filter(farms__name__in=[self.request.tenant]) #.filter(~Q(pk=self.request.user.id))
        return super().get_queryset()

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.UserSerializer_POST
        return serializers.UserSerializer_GET

    # def get_queryset(self):
    #     return self.queryset.filter(farms__in=[self.request.tenant.id])
    # return multi_farm_from_request(self.request, self.queryset)
