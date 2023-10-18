from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import NotFound

from . import models
from . import serializers

# Create your views here.
class FormulaViewSet(viewsets.ModelViewSet):
    queryset = models.Hatchery.objects.all()
    serializer_class = serializers.HatcherySerializer_GET

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.HatcherySerializer_POST
        return serializers.HatcherySerializer_GET


class HatcheryEggViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.HatcheryEggSerializer_GET

    def get_queryset(self):
        try:
            return models.HatcheryEgg.all.filter(hatchery=self.kwargs['hatchery_pk'])
        except models.HatcheryEgg.DoesNotExist as ex:
            raise NotFound()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.HatcheryEggSerializer_POST
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.HatcheryEggSerializer_PATCH
        return serializers.HatcheryEggSerializer_GET