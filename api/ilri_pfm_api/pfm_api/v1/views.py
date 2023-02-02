from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.db.models import Count
from rest_framework import generics

from pfm_api.v1.serializers import UserSerializer, DeviceSerializer, FarmSerializer, ChickenSerializer, ChickenParentSerializer, ChickenStageSerializer, EggSerializer, LayedPlaceSerializer, BreedTypeSerializer, ChickenGrowthSerializer
import pfm_api.v1.serializers as V1Serializer
from pfm_api.models import Device, Farm, Chicken, ChickenParent, BreedType, ChickenStage, Egg, LayedPlace, ChickenGrowth

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUidViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        try:
            instance = self.queryset.get(uid=pk)
            return Response(self.serializer_class(instance).data,
                            status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class FarmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ChickenViewSet(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    serializer_class = ChickenSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ChickenGrowthViewSet(viewsets.ModelViewSet):
    queryset = ChickenGrowth.objects.all()
    serializer_class = ChickenGrowthSerializer

class ChickenParentViewSet(viewsets.ModelViewSet):
    queryset = ChickenParent.objects.all()
    serializer_class = ChickenParentSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class BreedTypeParentViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.all()
    serializer_class = BreedTypeSerializer

    def perform_create(self, serializer):
  
        serializer.save(created_by=self.request.user)

class BreedTypeChickenPercentageViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.annotate(chicken_count = Count('chicken'))
    serializer_class = V1Serializer.BreedTypeReportPercentageSerializer
    pagination_class = None

    # def retrieve(self, request, *args, **kwargs):
    #     # ret = super(StoryViewSet, self).retrieve(request)
    #     return Response({'key': 'single value'})

    def list(self, request, *args, **kwargs):
        try:
            instance = self.get_queryset()
            return Response({
                'count': len(instance),
                'chicken_count': Chicken.objects.count(),
                'results': V1Serializer.BreedTypeReportPercentageSerializer(instance, many=True).data},
                            status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()

class ChickenStageParentViewSet(viewsets.ModelViewSet):
    queryset = ChickenStage.objects.all()
    serializer_class = ChickenStageSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class EggParentViewSet(viewsets.ModelViewSet):
    queryset = Egg.objects.all()
    serializer_class = EggSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class LayedPlaceViewSet(viewsets.ModelViewSet):
    queryset = LayedPlace.objects.all()
    serializer_class = LayedPlaceSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)