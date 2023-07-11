from django.shortcuts import render
from rest_framework import viewsets, status

from . import models
from . import serializers


class ContactViewSet(viewsets.ModelViewSet):
    queryset = models.Contact.objects.all()
    serializer_class = serializers.ContactSerializer_GET
