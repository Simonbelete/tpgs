from rest_framework import viewsets, status
from django.db.models import Count, Sum
from rest_framework.response import Response
from django.http import Http404, HttpResponse
from core.views import ModelFilterViewSet
from django_filters import rest_framework as filters
from django.db.models import Count, Sum
from django.db.models import F
import numpy as np

from breeds.models import BreedType
from chickens.models import Chicken
from breeds.api.serializers import BreedTypeSerializer_GET_V1, BreedTypeSerializer_Statics


class BreedTypeFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = BreedType
        fields = ['name']


class BreedTypeViewSet(ModelFilterViewSet):
    queryset = BreedType.objects.all()
    serializer_class = BreedTypeSerializer_GET_V1
    filterset_class = BreedTypeFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def filters(self):
        queryset = self.filter_queryset(self.get_queryset())
        return {
            'is_active': queryset.values('is_active').annotate(
                count=Count("pk", distinct=True), label=F('is_active'), value=F('is_active')),
        }


class BreedTypeCountViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.all()
    serializer_class = BreedTypeSerializer_Statics

    def list(self, request, *args, **kwargs):
        try:
            farms_ids = request.GET.get('farms', "") or ""

            chickens = Chicken.objects.all()
            results = self.queryset

            if len(farms_ids) != 0:
                farms_ids = np.array(farms_ids.split(',') or []).astype(int)
                chickens = chickens.filter(farm__in=farms_ids)
                results = results.filter(chickens__farm__in=farms_ids)
            elif request.user.is_superuser != True:
                farms_ids = request.user.farms.all()
                chickens = chickens.filter(farm__in=farms_ids)
                results = results.filter(chickens__farm__in=farms_ids)

            results = results.annotate(
                chicken_count=Count('chickens'))

            return Response({
                'chicken_count': chickens.count(),
                'results': self.get_serializer(results, many=True).data
            }, status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()
