from rest_framework import viewsets, status
from datetime import datetime, timedelta
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Sum, Avg, F
import numpy as np

from . import serializers
from core.views import HistoryViewSet
from .. import models
from chickens.models import Chicken
from flocks.models import Flock
from locations.models import House
from breeds.models import BreedType


class EggFilter(filters.FilterSet):
    chicken = filters.CharFilter(field_name='chicken', lookup_expr='exact')

    class Meta:
        model = models.Egg
        fields = ['chicken']


class EggViewSet(viewsets.ModelViewSet):
    queryset = models.Egg.objects.all()
    serializer_class = serializers.EggSerializer_GET_V1
    filterset_class = EggFilter
    search_fields = ['chicken__tag']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EggHistoryViewSet(HistoryViewSet):
    queryset = models.Egg.history.all()
    serializer_class = serializers.EggHistory


class HHEP(APIView):
    queryset = models.Egg.objects.all()

    def get(self, request):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))
        measurement = request.GET.get('measurement', 'daily')
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

                must_alive = (end_week - start_week) * 7
                # Handle null on days_alive
                chickens = Chicken.objects.all().filter(
                    id__in=chicken_ids, days_alive=None)
                chickens2 = Chicken.objects.all().filter(
                    id__in=chicken_ids, days_alive__lte=-10)
                week_eggs = models.Egg.objects.filter(
                    chicken__in=chicken_ids, week=week).aggregate(eggs_sum=Sum('eggs'))['eggs_sum'] or 0
                if (len(chickens) != 0 or len(chickens2)):
                    hdep = week_eggs/len(chickens) + len(chickens2) * 100
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
                        'hdep': hdep,
                        'week_eggs': week_eggs
                    })
            except Exception as ex:
                pass

        return Response({'results': results})


class EggGrading(APIView):
    queryset = models.Egg.objects.all()

    def get(self, request):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))

        farm = request.GET.get('farm') or 0
        breed_type = request.GET.get('breed_type') or 0
        house = request.GET.get('house') or 0

        data = []
        for week in range(start_week, end_week + 1):
            eggs = models.Egg.objects.filter(week=week).annotate(
                individual_egg_weight=F('total_weight')/F('eggs'))

            # Filter by
            if farm != 0:
                eggs = eggs.filter(chicken__farm=farm)
            if breed_type != 0:
                eggs = eggs.filter(chicken__breed_type=breed_type)
            if house != 0:
                eggs = eggs.filter(chicken__house=house)

            total_eggs = eggs.aggregate(eggs_count=Sum('eggs'))[
                'eggs_count'] or 0
            total_weight = eggs.aggregate(
                total_eggs_weight=Sum('total_weight'))['total_eggs_weight']
            div_total_eggs = total_eggs if total_eggs != 0 else 1
            avg_weight = total_weight/total_eggs if total_eggs != 0 else 0
            sm_grading = eggs.filter(individual_egg_weight__lt=53).aggregate(
                total_eggs=Sum('eggs'))['total_eggs'] or 0
            m_grading = eggs.filter(individual_egg_weight__gt=52, individual_egg_weight__lt=63).aggregate(
                total_eggs=Sum('eggs'))['total_eggs'] or 0
            lg_grading = eggs.filter(individual_egg_weight__gt=62, individual_egg_weight__lt=73).aggregate(
                total_eggs=Sum('eggs'))['total_eggs'] or 0
            xl_grading = eggs.filter(individual_egg_weight__gt=72).aggregate(
                total_eggs=Sum('eggs'))['total_eggs'] or 0
            data.append({
                'week': week,
                'avg_weight': avg_weight,
                'eggs_number': total_eggs,
                'eggs_weight': total_weight,
                'sm_grading': round(sm_grading/div_total_eggs * 100, 2),
                'm_grading': round(m_grading/div_total_eggs * 100, 2),
                'lg_grading': round(lg_grading/div_total_eggs * 100, 2),
                'xl_grading': round(xl_grading/div_total_eggs * 100, 2)
            })

        return Response({'results': data})


# class LayedEggsByHatch(APIView):
#     queryset = models.Egg.all()

#     def get(self, request):
#         year = int(request.GET.get('year', datetime.today().year))

#         for month in range(1, 12):
#             start_day = datetime(year, month, 1)
#             end_day = datetime(year, month + 1, 1) + timedelta(days=-1)

#             chickens = Chicken.objects.filter(
#                 hatch_date__gte=start_day, hatch_date__lte=end_day).values_list('id', flat=True)
#             eggs = models.Egg.objects.filter(chicken__in=chickens).aggregate(
#                 total_eggs=Sum('eggs'))
