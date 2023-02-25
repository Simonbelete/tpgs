from rest_framework import viewsets, status

from breeds.models import BreedType
from breeds.api.serializers import BreedTypeSerializer_GET_V1


class BreedTypeViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.all()
    serializer_class = BreedTypeSerializer_GET_V1
