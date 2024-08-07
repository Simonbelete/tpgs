import calendar
from datetime import datetime, timedelta, date
from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from django.db.models import Count, Sum, F, Value, Q, Avg, ExpressionWrapper, IntegerField, DecimalField
from django.db.models.functions import Concat, ExtractDay, Extract
import numpy as np

from core.views import HistoryViewSet
from chickens.models import Chicken
from . import serializers
from weights.models import Weight
from feeds.models import Feed
from eggs.models import Egg
from eggs.api.serializers import ChickenEggSerializer
from feeds.api.serializers import ChickenFeedSerialize
from weights.api.serializers import ChickenWeightSerializer
from core.views import ModelFilterViewSet
from breeding_pairs.models import BreedPair
from breeding_pairs.api.serializers import BreedPairSerializer_GET_V1


class ChickenFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')
    farm = filters.CharFilter(field_name='farm', lookup_expr='exact')
    flock = filters.CharFilter(field_name='flock', lookup_expr='exact')
    breed_type = filters.CharFilter(
        field_name='breed_type', lookup_expr='exact')
    sex = filters.CharFilter(field_name='sex', lookup_expr='contains')

    class Meta:
        model = Chicken
        fields = ['tag', 'farm', 'flock', 'sex', 'is_active',
                  'breed_type', 'house', 'dead_date', 'hatch_date', 'is_dead', 'breed_pair']


class ChickenViewSet(ModelFilterViewSet):
    queryset = Chicken.objects.all()
    serializer_class = serializers.ChickenSerializer_GET_V1
    filterset_class = ChickenFilter
    search_fields = ['tag']
    ordering_fields = '__all__'

    def filters(self):
        queryset = self.filter_queryset(self.get_queryset())
        return {
            'is_active': queryset.values('is_active').annotate(
                count=Count("pk", distinct=True), label=F('is_active'), value=F('is_active')),
            'is_dead': queryset.values('is_dead').annotate(
                count=Count("pk", distinct=True), label=F('is_dead'), value=F('is_dead')),
            'dead_date': queryset.values('dead_date').annotate(
                count=Count("pk", distinct=True), label=F('dead_date'), value=F('dead_date')),
            'sex': queryset.values('sex').annotate(
                count=Count("pk", distinct=True), label=F('sex'), value=F('sex')),
            'hatch_date': queryset.values('hatch_date').annotate(
                count=Count("pk", distinct=True), label=F('hatch_date'), value=F('hatch_date')),
            'farm': queryset.values('farm__name', 'farm__id').annotate(
                count=Count("pk", distinct=True), label=F('farm__name'), value=F('farm__id')),
            'flock': queryset.values('flock__name', 'flock__id').annotate(
                count=Count("pk", distinct=True), label=F('flock__name'), value=F('flock__id')),
            'house': queryset.values('house__name', 'house__id').annotate(
                count=Count("pk", distinct=True), label=F('house__name'), value=F('house__id')),
            'breed_type': queryset.values('breed_type__name', 'breed_type__id').annotate(
                count=Count("pk", distinct=True), label=F('breed_type__name'), value=F('breed_type__id')),
            'breed_pair': queryset.values('breed_pair__dam__tag', 'breed_pair__sire__tag', 'breed_pair__id').annotate(
                count=Count("pk", distinct=True), label=Concat('breed_pair__dam__tag', Value(' - '), 'breed_pair__sire__tag'), value=F('breed_pair__id')),
        }

# Feed Conversion ration - Growth


class FCrGrowth(APIView):
    queryset = Chicken.objects.all()

    def get(self, request, id=0):
        start_week = request.GET.get('start_week') or 0
        end_week = request.GET.get('end_week') or 0

        start_week = int(start_week)
        end_week = int(end_week)

        if id == 0 or end_week == 0:
            return Response({'results': [], 'error': ['Please provide valid data for start_week',
                                                      'Please provide valid data for end_week',
                                                      'Please provide valid data for id']}, status=status.HTTP_400_BAD_REQUEST)

        fcrs = []
        for current_week in range(start_week, end_week + 1):
            current_week_fcr = {'week': current_week}
            fcr = 0
            current_week_weight = 0
            previous_week_weight = 0
            weight_gain = 0
            feed_weight = 0
            try:
                feed = Feed.objects.get(chicken=id, week=current_week)
                current_week_weight = Weight.objects.get(
                    chicken=id, week=current_week)
                previous_week_weight = Weight.objects.get(
                    chicken=id, week=current_week - 1)

                feed_weight = feed.weight
                current_week_weight = current_week_weight.weight
                previous_week_weight = previous_week_weight.weight

                weight_gain = current_week_weight - previous_week_weight
                fcr = feed_weight/weight_gain
            except Exception as ex:
                fcr = 0
                current_week_weight = 0
                previous_week_weight = 0

            current_week_fcr['fcr'] = round(fcr, 3)
            current_week_fcr['current_week_weight'] = current_week_weight
            current_week_fcr['previous_week_weight'] = previous_week_weight
            current_week_fcr['weight_gain'] = weight_gain
            current_week_fcr['feed_weight'] = feed_weight
            fcrs.append(current_week_fcr)

        return Response({'results': fcrs, 'count': len(fcrs)}, status=status.HTTP_200_OK)


class FCrEgg(APIView):
    queryset = Chicken.objects.all()

    def get(self, request, id=0):
        start_week = request.GET.get('start_week') or 0
        end_week = request.GET.get('end_week') or 0

        start_week = int(start_week)
        end_week = int(end_week)

        if id == 0 or end_week == 0:
            return Response({'results': [], 'error': ['Please provide valid data for start_week',
                                                      'Please provide valid data for end_week',
                                                      'Please provide valid data for id']}, status=status.HTTP_400_BAD_REQUEST)

        fcrs = []
        for current_week in range(start_week, end_week + 1):
            current_week_fcr = {'week': current_week}
            fcr = 0
            eggs = 0
            total_egg_weight = 0
            feed_weight = 0
            try:
                feed = Feed.objects.get(chicken=id, week=current_week)
                total_egg_weight = Egg.objects.get(
                    chicken=id, week=current_week)

                feed_weight = feed.weight
                eggs = total_egg_weight.eggs
                total_egg_weight = total_egg_weight.total_weight

                fcr = feed_weight/total_egg_weight
            except:
                fcr = 0
            current_week_fcr['fcr'] = round(fcr, 3)
            current_week_fcr['total_egg_weight'] = total_egg_weight
            current_week_fcr['feed_weight'] = feed_weight
            current_week_fcr['eggs'] = eggs
            fcrs.append(current_week_fcr)

        return Response({'results': fcrs, 'count': len(fcrs)}, status=status.HTTP_200_OK)


class ChickenPedigreeViewSet(APIView):
    queryset = Chicken.objects.all()

    def get(self, request):
        chickens = self.queryset
        hierarchy = [
            {'id': '0', 'child': "0", 'parent': ""}
        ]
        for chicken in chickens.iterator():
            if chicken.breed_pair is None:
                node = {
                    'id': str(chicken.id),
                    'child': chicken.name,
                    'parent': '0'
                }
                hierarchy.append(node)
            else:
                parent_sire = str(chicken.breed_pair.sire.id) + " " + str(
                    chicken.breed_pair.sire.breed_pair.sire.id) if chicken.breed_pair.sire.breed_pair else str(chicken.breed_pair.sire.id)
                parent_dam = str(chicken.breed_pair.dam.id) + " " + str(
                    chicken.breed_pair.dam.breed_pair.dam.id) if chicken.breed_pair.dam.breed_pair else str(chicken.breed_pair.dam.id)
                node_sire = {
                    'id': str(chicken.id) + " " + str(chicken.breed_pair.sire.id),
                    'child': chicken.name,
                    'parent': parent_sire
                }
                node_dam = {
                    'id': str(chicken.id) + " " + str(chicken.breed_pair.dam.id),
                    'child': chicken.name,
                    'parent': parent_dam
                }
                hierarchy.append(node_sire)
                hierarchy.append(node_dam)

        return Response({'results': hierarchy})


class ChickenMoralityRate(APIView):
    queryset = Chicken.objects.all()

    def get(self, request):
        pass


class ChickenHistoryViewSet(HistoryViewSet):
    queryset = Chicken.history.all()
    serializer_class = serializers.ChickenHistory
    search_fields = ['name']
    ordering_fields = '__all__'


class ChickenStaticsViewSet(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    serializer_class = serializers.ChickenSerializer_GET_V1

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        latest_weight = Weight.objects.all().filter(chicken=id).latest('week')
        total_feed = Feed.objects.filter(
            chicken=id).aggregate(feed_sum=Sum('weight'))
        total_egg = Egg.objects.filter(
            chicken=id).aggregate(egg_sum=Sum('eggs'))
        feed = total_feed['feed_sum']
        breding_partner = BreedPair.objects.filter(
            Q(sire=id) | Q(dam=id)).aggregate(count=Count('id'))
        breeding_pairs = BreedPair.objects.filter(
            Q(sire=id) | Q(dam=id)).values_list('id', flat=True)
        offsprings = Chicken.objects.filter(
            breed_pair__in=breeding_pairs).aggregate(count=Count('id'))

        return Response({
            'weight': {
                'week': latest_weight.week,
                'weight': latest_weight.weight,
            },
            'total_egg': total_egg['egg_sum'] if total_egg else 0,
            'total_feed': feed,
            'total_breeding': breding_partner['count'] if breding_partner else 0,
            'total_offsprings': offsprings['count'] if offsprings else 0
        }, status=status.HTTP_200_OK)


class ChickenEggsviewSet(viewsets.ModelViewSet):
    queryset = Egg.objects.all()
    serializer_class = ChickenEggSerializer

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))

        queryset = self.filter_queryset(self.get_queryset().filter(
            chicken=id, week__in=range(start_week, end_week + 1)))

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})


class ChickenFeedsviewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = ChickenFeedSerialize

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))

        queryset = self.filter_queryset(self.get_queryset().filter(
            chicken=id, week__in=range(start_week, end_week + 1)).order_by('week'))

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})


class ChickenWeightsviewSet(viewsets.ModelViewSet):
    queryset = Weight.objects.all()
    serializer_class = ChickenWeightSerializer

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))
        weeks = [*range(start_week, end_week + 1)]
        queryset = self.filter_queryset(self.get_queryset().filter(
            chicken=id, week__in=weeks).order_by('week'))

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})


class ChickenPartnerviewSet(viewsets.ModelViewSet):
    queryset = BreedPair.objects.all()
    serializer_class = BreedPairSerializer_GET_V1

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']

        queryset = self.filter_queryset(
            self.get_queryset().filter(Q(sire=id) | Q(dam=id)))
        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})


class ChickenOffspringsViewSet(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    serializer_class = serializers.ChickenSerializerOffsprings_GET_V1

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        breeding_pairs = BreedPair.objects.filter(
            Q(sire=id) | Q(dam=id)).values_list('id', flat=True)
        queryset = self.filter_queryset(
            self.get_queryset().filter(breed_pair__in=breeding_pairs))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # def list(self, request, *args, **kwargs):
    #     id = self.kwargs['id']

    #     breeding_pairs = BreedPair.objects.filter(
    #         Q(sire=id) | Q(dam=id)).values_list('id', flat=True)

    #     queryset = self.filter_queryset(
    #         self.get_queryset().filter(breed_pair__in=breeding_pairs))
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response({'results': serializer.data})


class chickenFeebByWeightReport(APIView):
    queryset = Chicken.objects.all()

    def get(self, request):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))

        period = request.GET.get('period') or 'daily'
        farm = request.GET.get('farm') or 0
        breed_type = request.GET.get('breed_type') or 0
        house = request.GET.get('house') or 0

        dataset = []
        labels = []
        feeds_dataset = []
        weights_dataset = []

        # TODO: Returns Chart Js dataset
        # TODO: Improve performance
        for week in range(start_week, end_week + 1):
            labels.append('Week %s' % week)
            feeds = Feed.objects.filter(week=week)
            weights = Weight.objects.filter(week=week)
            if farm != 0:
                feeds = feeds.filter(chicken__farm=farm)
                weights = weights.filter(chicken__farm=farm)
            if breed_type != 0:
                feeds = feeds.filter(chicken__breed_type=breed_type)
                weights = weights.filter(chicken__breed_type=breed_type)
            if house != 0:
                feeds = feeds.filter(chicken__house=house)
                weights = weights.filter(chicken__house=house)
            feeds = feeds.aggregate(weight_avg=Avg('weight'))
            fv = (feeds['weight_avg'] /
                  7) if period == 'daily' and feeds['weight_avg'] != None else feeds['weight_avg']
            feeds_dataset.append(fv)
            weights = weights.aggregate(weight_avg=Avg('weight'))
            weights_dataset.append(weights['weight_avg'])

        return Response({'results': dataset, 'chartjs': {'labels': labels, 'y1': feeds_dataset, 'y2': weights_dataset}})


class ChickenMortality(APIView):
    queryset = Chicken.objects.all()

    def get(self, request):
        year = int(request.GET.get('year', datetime.today().year))
        farms_ids = request.GET.get('farms', "") or ""
        chickens = Chicken.objects.all()

        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)
            chickens = chickens.filter(farm__in=farms_ids)
        elif request.user.is_superuser != True:
            farms_ids = request.user.farms.all()
            chickens = chickens.filter(farm__in=farms_ids)

        data = []
        labels = []
        values = []
        for month in range(1, 13):
            start_day = datetime(year, month, 1)
            # end_day = datetime(year, month, 1) + timedelta(days=-1)
            end_day = calendar.monthrange(year, month)
            end_day = datetime(year, month, end_day[1])
            chicken_dead = chickens.filter(
                dead_date__gte=start_day, dead_date__lte=end_day).count() or 0
            data.append({
                'month': month,
                'dead_count': chicken_dead
            })
            labels.append(start_day.strftime("%b"))
            values.append(chicken_dead)
        return Response({'results': data, 'chartjs': {'labels': labels, 'data': values}})


class ChickenHatchery(APIView):
    queryset = Chicken.objects.all()

    def get(self, request):
        year = int(request.GET.get('year', datetime.today().year))
        farms_ids = request.GET.get('farms', "") or ""
        chickens = Chicken.objects.all()

        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)
            chickens = chickens.filter(farm__in=farms_ids)
        elif request.user.is_superuser != True:
            farms_ids = request.user.farms.all()
            chickens = chickens.filter(farm__in=farms_ids)

        data = []
        labels = []
        values = []
        for month in range(1, 13):
            start_day = datetime(year, month, 1)
            # end_day = datetime(year, month + 1, 1) + timedelta(days=-1)
            end_day = calendar.monthrange(year, month)
            end_day = datetime(year, month, end_day[1])
            chicken_dead = chickens.filter(
                hatch_date__gte=start_day, hatch_date__lte=end_day).count() or 0
            data.append({
                'month': month,
                'hatch_count': chicken_dead
            })
            labels.append(start_day.strftime("%b"))
            values.append(chicken_dead)
        return Response({'results': data, 'chartjs': {'labels': labels, 'data': values}})


class ChickenSexChart(APIView):
    queryset = Chicken.objects.all()

    def get(self, request):
        chickens = self.queryset
        farms_ids = request.GET.get('farms', "") or ""
        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)
            chickens = chickens.filter(farm__in=farms_ids)
        elif request.user.is_superuser != True:
            farms_ids = request.user.farms.all()
            chickens = chickens.filter(farm__in=farms_ids)

        return Response({'results': [], 'chartjs': {'labels': ['Male', 'Female', 'Unknown'], 'data': [
            chickens.filter(sex='M').count(),
            chickens.filter(sex='F').count(),
            chickens.filter(~Q(sex='M') & ~Q(sex='F')).count()
        ]}})


class ChickensAgeGroupChart(APIView):
    queryset = Chicken.objects.all()

    def get(self, request):
        chickens = self.queryset
        farms_ids = request.GET.get('farms', "") or ""
        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)
            chickens = chickens.filter(farm__in=farms_ids)
        elif request.user.is_superuser != True:
            farms_ids = request.user.farms.all()
            chickens = chickens.filter(farm__in=farms_ids)

        unknown_chickens = chickens.filter(Q(hatch_date=None))
        chickens = chickens.filter(~Q(hatch_date=None))
        chickens = chickens.annotate(
            age_in_microseconds=ExpressionWrapper(date.today() - F('hatch_date'), output_field=IntegerField()))
        chickens = chickens.annotate(
            age_in_days=ExpressionWrapper(F('age_in_microseconds')/86400000000, output_field=DecimalField()))

        return Response({'results': [], 'chartjs': {'labels': [
            '0-16 weeks', '16-20 weeks', '12 months', '12-18 months', '2+ years', 'Unknown'
        ], 'data': [
            chickens.filter(age_in_days__gte=0, age_in_days__lte=112).count(),
            chickens.filter(age_in_days__gte=113,
                            age_in_days__lte=140).count(),
            chickens.filter(age_in_days__gte=365,
                            age_in_days__lte=395).count(),
            chickens.filter(age_in_days__gte=365,
                            age_in_days__lte=547).count(),
            chickens.filter(age_in_days__gte=730).count(),
            unknown_chickens.count()
        ]}})
