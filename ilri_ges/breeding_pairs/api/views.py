import numpy as np
from rest_framework import viewsets
from rest_framework.response import Response

from core.views import HistoryViewSet
from breeding_pairs.models import BreedPair
from chickens.models import Chicken
from chickens.api.serializers import ChickenSerializer_GET_V1
from breeding_pairs.api.serializers import BreedPairSerializer_GET_V1, BreedPairSerializer_POST_V1, BreedPairHistory


class BreedPairViewSet(viewsets.ModelViewSet):
    queryset = BreedPair.objects.all()
    serializer_class = BreedPairSerializer_GET_V1
    search_fields = ['sire__tag', 'dam__tag']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return BreedPairSerializer_GET_V1
        return BreedPairSerializer_POST_V1


class BreedPairChildrenViewSet(viewsets.ModelViewSet):
    queryset = BreedPair.objects.all()
    serializer_class = ChickenSerializer_GET_V1
    search_fields = ['children__tag']
    ordering_fields = '__all__'

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(
            self.get_queryset().get(pk=pk))
        queryset = queryset.children.all()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class BreedPairHistoryViewSet(HistoryViewSet):
    queryset = BreedPair.history.all()
    serializer_class = BreedPairHistory


class BreedPairTreeViewSet(viewsets.ModelViewSet):
    queryset = BreedPair.objects.all()
    serializer_class = BreedPairSerializer_GET_V1

    def list(self, request, *args, **kwargs):
        breed_pairs = self.queryset
        tree = []
        for row in breed_pairs.iterator():
            node = {
                'name': '%s %s' % (row.sire.name, row.dam.name),
                'children': []
            }
            for child in row.children.iterator():
                node['children'].append({'name': child.name})
            tree.append(node)

        return Response({'results': tree})
