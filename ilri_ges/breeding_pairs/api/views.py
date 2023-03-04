import numpy as np
from rest_framework import viewsets
from rest_framework.response import Response

from breeding_pairs.models import BreedPair
from breeding_pairs.api.serializers import BreedPairSerializer_GET_V1, BreedPairSerializer_POST_V1


class BreedPairViewSet(viewsets.ModelViewSet):
    queryset = BreedPair.objects.all()
    serializer_class = BreedPairSerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return BreedPairSerializer_GET_V1
        return BreedPairSerializer_POST_V1


class BreedPairTreeViewSet(viewsets.ModelViewSet):
    queryset = BreedPair.objects.all()
    serializer_class = BreedPairSerializer_GET_V1

    def list(self, request, *args, **kwargs):
        data = self.get_serializer(self.queryset, many=True).data
        data = self.queryset
        tree = np.array(data)
        print('-----------------------------------------')
        print(data[1].children)
        return Response({'hello': 'abc'})
