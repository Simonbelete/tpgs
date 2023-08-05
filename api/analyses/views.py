from django.shortcuts import render
from rest_framework import viewsets, status
import django_filters
from rest_framework.response import Response

from . import models
from . import serializers
from eggs.models import Egg
from flocks.models import Flock


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


class HDEPViewSet(viewsets.ViewSet):
    def get_query(self):
        return Egg.objects.all()

    def list(self, request, **kwargs):
        print('---------------')
        print(kwargs)
        eggs = self.get_query()
        if (kwargs['farm_id'] == 'all'):
            return Response({
                'errors': [
                    'farm can not be all'
                ]
            })
        if (kwargs['flock_id'] != 'all'):
            eggs = eggs.filter(flock=kwargs['flock_id'])
        if (kwargs['house_id'] != 'all'):
            eggs = eggs.filter(chicken__house=kwargs['house_id'])

        return Response({})
