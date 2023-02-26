from rest_framework import viewsets, status

from chickens.models import Chicken
from chickens.api.serializers import ChickenSerializer_GET_V1


class ChickenViewSet(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    serializer_class = ChickenSerializer_GET_V1
