from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import Group
from django_filters import rest_framework as filters
from django.db.models import Count, Sum
from django.db.models import F

from users.models import User
from users.api.serializers import UserSerializer_GET_V1, GroupSerializer_GET_V1
from core.views import ModelFilterViewSet


class UserFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = User
        fields = ['name', 'email', 'groups', 'is_active', 'farms']


class UserViewSet(ModelFilterViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer_GET_V1
    filterset_class = UserFilter
    search_fields = ['name', 'email']
    ordering_fields = '__all__'

    def filters(self):
        queryset = self.filter_queryset(self.get_queryset())
        return {
            'farms': queryset.values('farms__name', 'farms__id').annotate(
                count=Count("pk", distinct=True), label=F('farms__name'), value=F('farms__id')),
            'groups': queryset.values('groups__name', 'groups__id').annotate(
                count=Count("pk", distinct=True), label=F('groups__name'), value=F('groups__id')),
            'is_active': queryset.values('is_active').annotate(
                count=Count("pk", distinct=True), label=F('is_active'), value=F('is_active')),
        }


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer_GET_V1
