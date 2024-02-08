from rest_framework import viewsets, mixins

from . import models
from . import serializers
from . import filters


class FarmViewSet(mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    queryset = models.Farm.objects.all()
    serializer_class = serializers.FarmSerializer_GET
    filterset_class = filters.FarmFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
