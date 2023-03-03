from rest_framework import viewsets, status

from farms.models import Farm
from .serializers import FarmSerializer_GET_V1


class FarmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer_GET_V1

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
