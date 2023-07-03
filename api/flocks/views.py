import io
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from django.http import HttpResponse
from datetime import date
from django.conf import settings
import django_filters

from . import models
from . import serializers
from . import admin


class FlockFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Flock
        fields = ['name']


class FlockViewSet(viewsets.ModelViewSet):
    queryset = models.Flock.objects.all()
    serializer_class = serializers.FlockSerializer_GET
    filterset_class = FlockFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.FlockSerializer_POST
        return serializers.FlockSerializer_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class FlockXlsxExport(APIView):
    def get(self, request):
        dataset = admin.FlockResource().export()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FlockXlsExport(APIView):
    def get(self, request):
        dataset = admin.FlockResource().export()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class FlockCsvExport(APIView):
    def get(self, request):
        dataset = admin.FlockResource().export()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="flocks_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
