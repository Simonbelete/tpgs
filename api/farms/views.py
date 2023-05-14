from rest_framework import viewsets, status

from . import models
from . import serializers

class FarmViewSet(viewsets.ModelViewSet):
    queryset = models.Farm.objects.all()
    serializer_class = serializers.FarmSerializer_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
