from django_filters import rest_framework as filters

from . import models


class ImportJobFilter(filters.FilterSet):
    farm = filters.CharFilter(field_name='farm__name', lookup_expr='exact')

    class Meta:
        model = models.ImportJob
        fields = ['farm']


class ExportJobFilter(filters.FilterSet):
    farm = filters.CharFilter(field_name='farm__name', lookup_expr='exact')

    class Meta:
        model = models.ExportJob
        fields = ['farm']
