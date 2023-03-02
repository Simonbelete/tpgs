from rest_framework import viewsets, status
from django.db.models import Count, Sum
from rest_framework.response import Response
from django.http import Http404, HttpResponse

from breeds.models import BreedType
from chickens.models import Chicken
from breeds.api.serializers import BreedTypeSerializer_GET_V1, BreedTypeSerializer_Statics


class BreedTypeViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.all()
    serializer_class = BreedTypeSerializer_GET_V1


class BreedTypeCountViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.annotate(
        chicken_count=Count('chickens'))
    serializer_class = BreedTypeSerializer_Statics

    def list(self, request, *args, **kwargs):
        try:
            return Response({
                'chicken_count': Chicken.objects.count(),
                'results': self.get_serializer(self.queryset, many=True).data
            }, status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()
