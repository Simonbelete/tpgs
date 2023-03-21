from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from django.db.models import Count, Sum, F, Value
from django.db.models.functions import Concat

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


class ChickenFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')
    farm = filters.CharFilter(field_name='farm', lookup_expr='exact')
    flock = filters.CharFilter(field_name='flock', lookup_expr='exact')
    breed_type = filters.CharFilter(
        field_name='breed_type', lookup_expr='exact')
    sex = filters.CharFilter(field_name='sex', lookup_expr='contains')

    class Meta:
        model = Chicken
        fields = ['tag', 'farm', 'flock', 'sex', 'is_active', 'breed_type']


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

        return Response({
            'weight': {
                'week': latest_weight.week,
                'weight': latest_weight.weight,
            },
            'total_egg': total_egg['egg_sum'] if total_egg else 0,
            'total_feed': feed
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
            chicken=id, week__in=range(start_week, end_week + 1)))

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})


class ChickenWeightsviewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = ChickenWeightSerializer

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))

        queryset = self.filter_queryset(self.get_queryset().filter(
            chicken=id, week__in=range(start_week, end_week + 1)))

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})
