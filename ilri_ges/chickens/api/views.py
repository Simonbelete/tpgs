from rest_framework import viewsets, status
from django_filters import rest_framework as filters

from chickens.models import Chicken
from chickens.api.serializers import ChickenSerializer_GET_V1


class ChickenFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')
    farm = filters.CharFilter(field_name='farm', lookup_expr='exact')
    flock = filters.CharFilter(field_name='flock', lookup_expr='exact')
    breed_type = filters.CharFilter(
        field_name='breed_type', lookup_expr='exact')
    sex = filters.CharFilter(field_name='sex', lookup_expr='contains')

    class Meta:
        model = Chicken
        fields = ['tag', 'farm', 'flock', 'sex', 'breed_type']


class ChickenViewSet(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    serializer_class = ChickenSerializer_GET_V1
    filterset_class = ChickenFilter
    search_fields = ['tag']
    ordering_fields = '__all__'
