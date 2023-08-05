from django.shortcuts import render
from rest_framework import viewsets, status
import django_filters

from . import models
from . import serializers


class DirectoryListFilter(django_filters.FilterSet):
    farm_name = django_filters.CharFilter(
        field_name='farm_name', lookup_expr='contains')

    class Meta:
        model = models.DirectoryList
        fields = ['farm_name']


class DirectoryListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.DirectoryList.objects.all()
    serializer_class = serializers.DirectoryListSerializer_GET
    filterset_class = DirectoryListFilter
    search_fields = ['field_name', 'flock_name', 'house_name']
    ordering_fields = '__all__'
