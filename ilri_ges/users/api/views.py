from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import Group
from django_filters import rest_framework as filters

from users.models import User
from users.api.serializers import UserSerializer_GET_V1, GroupSerializer_GET_V1


class UserFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = User
        fields = ['name', 'is_active', 'farms']


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer_GET_V1
    filterset_class = UserFilter
    search_fields = ['name']
    ordering_fields = '__all__'


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer_GET_V1
