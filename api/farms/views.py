from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

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
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def list(self, request, *args, **kwargs):        
        if(request.user.is_superuser):
            return super().list(request, *args, **kwargs)
        
        ids = request.user.farms.values_list('id', flat=True)
        queryset = models.Farm.objects.filter(pk__in=ids)
        
        queryset = self.filter_queryset(queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
