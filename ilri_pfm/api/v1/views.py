from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

import api.models as models
from api.v1 import serializers


class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer_GET_V1

    def get_serializer_class(self):
        if self.request.version == 'v1':
            return serializers.CountrySerializer_GET_V1
        return serializers.CountrySerializer_GET_V1


class ListUsers(APIView):

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        return Response({'a': 'b'})
