from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Sum
import numpy as np

from . import serializers
from core.views import HistoryViewSet
from .. import models
from chickens.models import Chicken
from flocks.models import Flock
from locations.models import House
from breeds.models import BreedType


class EggFilter(filters.FilterSet):
    class Meta:
        model = models.Egg
        fields = ''


class EggViewSet(viewsets.ModelViewSet):
    queryset = models.Egg.objects.all()
    serializer_class = serializers.EggSerializer_GET_V1
    filterset_class = EggFilter
    search_fields = ['chicken']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EggHistoryViewSet(HistoryViewSet):
    queryset = models.Egg.history.all()
    serializer_class = serializers.EggHistory


class HHEP(APIView):
    queryset = models.Egg.objects.all()

    def get(self, request):
        start_week = request.GET.get('start_week') or 0
        end_week = request.GET.get('end_week') or 0
        measurement = request.GET.get('measurement') or 'daily'
        # chicken, flock, breed
        group = request.GET.get('group') or 'chicken'
        chicken_ids = request.GET.get('chicken') or []
        flocks = request.GET.get('flock') or ""
        breeds = request.GET.get('breeds') or ""

        if chicken_ids:
            chicken_ids = np.array(chicken_ids.split(',') or []).astype(int)
        flocks = flocks.split(',') or []
        breeds = breeds.split(',') or []

        # start_week = int(start_week or 0)
        # end_week = int(end_week or 0)

        results = []
        for week in range(start_week, end_week + 1):
            week_eggs = 0
            hdep = 0

            try:
                if group == 'chicken':
                    chicken_ids = chicken_ids
                elif group == 'flock':
                    flock = Flock.objects.get(pk=flock)
                    chicken_ids = flock.chickens.values_list('id', flat=True)
                elif group == 'house':
                    house = House.objects.get(pk=house)
                    chicken_ids = house.chickens.values_list('id', flat=True)
                elif group == 'breed':
                    breed_type = BreedType.objects.get(pk=breed_type)
                    chicken_ids = breed_type.chickens.values_list(
                        'id', flat=True)

                chickens = Chicken.objects.all().filter(
                    id__in=chicken_ids, days_alive__lte=start_week*7)
                week_eggs = models.Egg.objects.filter(
                    chicken__in=chicken_ids).aggregate(eggs_sum=Sum('eggs'))['eggs_sum'] or 0
                if (len(chickens) != 0):
                    hdep = week_eggs/len(chickens) * 100
                if measurement == 'daily':
                    for day in range(1, 8):
                        chickens = chickens.filter(
                            days_alive__lte=day + (week-1)*7)
                        if (len(chickens) != 0):
                            hdep = week_eggs/len(chickens) * 100
                        results.append({
                            'week': week,
                            'day': day,
                            'hdep': hdep
                        })
                else:
                    results.append({
                        'week': week,
                        'hdep': hdep
                    })
            except Exception as ex:
                pass

        return Response({'results': results})
