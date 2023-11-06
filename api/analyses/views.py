from django.shortcuts import render
from rest_framework import viewsets, status
import django_filters
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, F, Q
from django_tenants.utils import tenant_context
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from django.db import connection
from datetime import timedelta, date

from . import models
from . import serializers
from eggs.models import Egg
from flocks.models import Flock, FlockReduction, FlockAccusation
from farms.models import Farm
from feeds.models import Feed
from weights.models import Weight
from chickens.models import Chicken
from users.models import User


class DirectoryListFilter(django_filters.FilterSet):
    farm_name = django_filters.CharFilter(
        field_name='farm_name', lookup_expr='contains')
    farm_id = django_filters.NumberFilter(
        field_name='farm_id', lookup_expr='exact')

    class Meta:
        model = models.DirectoryList
        fields = ['farm_name', 'farm_id']


class DirectoryListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.DirectoryList.objects.all()
    serializer_class = serializers.DirectoryListSerializer_GET
    filterset_class = DirectoryListFilter
    search_fields = ['farm_name', 'breed_name', 'generation',
                     'hatchery_name', 'house_name', 'pen_name']
    ordering_fields = '__all__'


class BatchDirectoryListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.DirectoryList.objects.all()
    serializer_class = serializers.DirectoryListSerializer_GET
    filterset_class = DirectoryListFilter
    search_fields = ['farm_name', 'hatchery_name', 'house_name']
    ordering_fields = '__all__'

    def get_queryset(self):
        self.request.tenant
        return self.queryset.filter(
            Q(farm_name=self.request.tenant) &
            ~Q(pen_id=1) & ~Q(hatchery_id=1), ~Q(house_id=1)
        )


class DirectoryListRefresh(viewsets.ViewSet):
    def create(self, request):
        try:
            models.DirectoryList.refresh_view()
            return Response({}, status=200)
        except Exception as ex:
            print(ex)
            return Response({}, status=500)


class CountViewSet(viewsets.ViewSet):
    def list(self, request, **kwargs):
        return Response({
            'user_count': User.objects.filter(farms__name__in=[self.request.tenant]).count(),
            'total_users': User.objects.count(),
            'farm_count': self.request.user.farms.all().count(),
            'total_farms': Farm.objects.count(),
        })


class HDEPViewSet(viewsets.ViewSet):
    def get_query(self):
        return Egg.objects.all()

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='start_week', description='Start Week', location=OpenApiParameter.QUERY, required=False, type=int),
            OpenApiParameter(
                name='end_week', description='End Week', location=OpenApiParameter.QUERY, required=False, type=int),
        ]
    )
    def list(self, request, **kwargs):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))
        flock_id = kwargs['flock_id']
        farm_id = kwargs['farm_id']
        eggs = self.get_query()
        if (kwargs['farm_id'] == 'all'):
            return Response({
                'errors': [
                    'farm can not be all'
                ]
            })
        farm = Farm.objects.get(pk=farm_id)
        with tenant_context(farm):
            if (kwargs['flock_id'] != 'all'):
                eggs = eggs.filter(Q(flock=kwargs['flock_id']) | Q(
                    chicken__flock=kwargs['flock_id']))
            if (kwargs['house_id'] != 'all'):
                eggs = eggs.filter(chicken__house=kwargs['house_id'])

            results = []
            for week in range(start_week, end_week + 1):
                print('***')
                weekly_no_eggs = eggs.filter(week=week).aggregate(
                    sum=Sum('eggs'))['sum'] or 0

                flock_accusation = FlockAccusation.objects.filter(
                    flock=flock_id)
                total_accusation = 0
                for x in flock_accusation.iterator():
                    if x.accusation_week <= week:
                        total_accusation += x.total_female_chickens

                flock_reduction = FlockReduction.objects.filter(flock=flock_id)
                total_reduction = 0
                for x in flock_reduction.iterator():
                    if x.reduction_week <= week:
                        total_reduction += x.total_female_chickens

                alive_chickens = total_accusation - total_reduction
                alive_chickens = 1 if alive_chickens == 0 else alive_chickens

                hdep = weekly_no_eggs / alive_chickens * 100
                results.append({
                    'week': week,
                    'hdep': hdep,
                    'accusation': total_accusation,
                    'reduction': total_reduction,
                    'no_eggs': weekly_no_eggs
                })
            return Response({'results': results})


class HHEPViewSet(viewsets.ViewSet):
    def get_query(self):
        return Egg.objects.all()

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='start_week', description='Start Week', location=OpenApiParameter.QUERY, required=False, type=int),
            OpenApiParameter(
                name='end_week', description='End Week', location=OpenApiParameter.QUERY, required=False, type=int),
        ]
    )
    def list(self, request, **kwargs):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))
        flock_id = kwargs['flock_id']
        farm_id = kwargs['farm_id']
        eggs = self.get_query()
        if (kwargs['farm_id'] == 'all'):
            return Response({
                'errors': [
                    'farm can not be all'
                ]
            })
        farm = Farm.objects.get(pk=farm_id)
        with tenant_context(farm):
            if (kwargs['flock_id'] != 'all'):
                eggs = eggs.filter(Q(flock=kwargs['flock_id']) | Q(
                    chicken__flock=kwargs['flock_id']))
            if (kwargs['house_id'] != 'all'):
                eggs = eggs.filter(chicken__house=kwargs['house_id'])

            results = []
            for week in range(start_week, end_week + 1):
                weekly_no_eggs = eggs.filter(week=week).aggregate(
                    sum=Sum('eggs'))['sum'] or 0
                total_female_chickens = Flock.objects.get(
                    pk=flock_id).total_female_accusation
                total_female_chickens = 1 if total_female_chickens == 0 else total_female_chickens

                hhep = weekly_no_eggs / total_female_chickens * 100
                results.append({
                    'week': week,
                    'hhep': hhep,
                    'no_eggs': weekly_no_eggs
                })
            return Response({'results': results})


class AverageWeight(viewsets.ViewSet):
    def get_query(self):
        return Feed.objects.all()

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='start_week', description='Start Week', location=OpenApiParameter.QUERY, required=False, type=int),
            OpenApiParameter(
                name='end_week', description='End Week', location=OpenApiParameter.QUERY, required=False, type=int),
            OpenApiParameter(
                name='sex', description='Sex', location=OpenApiParameter.QUERY, required=False, type=str),
        ]
    )
    def list(self, request, **kwargs):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 0))
        sex = request.GET.get('sex')
        farm_id = kwargs['farm_id']
        flock_id = kwargs['flock_id']
        house_id = kwargs['house_id']

        if (kwargs['farm_id'] == 'all'):
            return Response({
                'errors': [
                    'farm can not be all'
                ]
            })
        farm = Farm.objects.get(pk=farm_id)
        feeds = self.get_query()
        with tenant_context(farm):
            if (flock_id != 'all'):
                feeds = feeds.filter(Q(flock=flock_id) | Q(
                    chicken__flock=kwargs['flock_id']))
            if (house_id != 'all'):
                feeds = feeds.filter(chicken__house=house_id)
            if (sex and sex == 'M'):
                feeds = feeds.filter()

            flock_weight = feeds.filter(flock__isNull=False).aggregate(
                weight_sum=Sum('weight'), )
            weights = feeds.aggregate(avg=Avg('weight'))


class FarmHeatMap(viewsets.ViewSet):
    def list(self, request, **kwargs):
        farms = Farm.objects.all().execlude(name='public')
        cities = farms.values('city').annotate(
            total=Count('city')).order_by('total')
        print('------')
        print(cities)
        return Response({'geojson': []})


class PedigreeViewset(viewsets.ViewSet):
    def get_query(self):
        return Chicken.objects.all()

    def filter_by_flock(self, queryset, flock_id):
        if (flock_id != 'all'):
            return queryset.filter(flock=flock_id)
        return queryset

    def filter_by_house(self, queryset, house_id):
        if (house_id != 'all'):
            return queryset.filter(house=house_id)
        return queryset

    def list(self, request, **kwargs):
        farm_id = kwargs['farm_id']
        flock_id = kwargs['flock_id']
        house_id = kwargs['house_id']

        if (kwargs['farm_id'] == 'all'):
            return Response({
                'errors': [
                    'farm can not be all'
                ]
            })

        try:
            farm = Farm.objects.get(pk=farm_id)
            queryset = self.get_query().filter(reduction_date__isnull=False)

            with tenant_context(farm):
                queryset = self.filter_by_flock(queryset, flock_id)
                queryset = self.filter_by_house(queryset, house_id)

                nodes = serializers.PedigreeSerializer(queryset, many=True)
                links = []

                for chicken in queryset.iterator():
                    if (chicken.sire):
                        links.append({
                            'source': chicken.sire.id,
                            'target': chicken.id
                        })
                    if (chicken.dam):
                        links.append({
                            'source': chicken.dam.id,
                            'target': chicken.id
                        })
            return Response({
                'results': {
                    'nodes': nodes.data,
                    'links': links
                }
            }, status=200)
        except Farm.DoesNotExist:
            return Response({'error': 'Farm doesnot exist'}, status=400)
        except Exception as ex:
            print(ex)
            return Response({}, status=500)


class WBFT(viewsets.ViewSet):
    """Weight By Feed Type(Formula)
    """

    def filter_by_flock(self, queryset, flock_id):
        if (flock_id != 'all'):
            return queryset.filter(flock=flock_id)
        return queryset

    def filter_by_house(self, queryset, house_id):
        if (house_id != 'all'):
            return queryset.filter(house=house_id)
        return queryset

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='week', description='Week', location=OpenApiParameter.QUERY, required=False, type=int),
            OpenApiParameter(
                name='sex', description='Sex', location=OpenApiParameter.QUERY, required=False, type=str),
        ]
    )
    def list(self, request, **kwargs):
        week = int(request.GET.get('week', 0))
        farm_id = kwargs['farm_id']
        flock_id = kwargs['flock_id']
        house_id = kwargs['house_id']

        if (kwargs['farm_id'] == 'all'):
            return Response({
                'errors': [
                    'farm can not be all'
                ]
            })

        try:
            farm = Farm.objects.get(pk=farm_id)

            with tenant_context(farm):
                queryset = Feed.objects.filter(week=week)
                queryset = self.filter_by_flock(queryset, flock_id)
                queryset = self.filter_by_house(queryset, house_id)

                weight_queryset = Weight.objects.filter(week=week)
                weight_queryset = self.filter_by_flock(
                    weight_queryset, flock_id)
                weight_queryset = self.filter_by_house(
                    weight_queryset, house_id)

                cursor = connection.cursor()
                cursor.execute("""
                    SET search_path TO {farm};

                    SELECT * FROM feeds_feed ff
                        INNER JOIN weights_weight ww
                            ON ff.flock_id = ww.flock_id
                                OR ff.chicken_id = ww.flock_id;
                """.format(farm=farm))

                return Response({
                    'results': cursor.fetchall()
                }, status=200)

        # flock, chicken, weight, formula
        except Farm.DoesNotExist:
            return Response({'error': 'Farm doesnot exist'}, status=400)
        except Exception as ex:
            print(ex)
            return Response({}, status=500)


class EggProduction(viewsets.ViewSet):
    queryset = Chicken.objects.all()

    def filter_by_directory(self, **kwargs):
        queryset = self.queryset

        breed_id = kwargs['breed_id'] if 'breed_id' in kwargs else 0
        generation = kwargs['generation'] if 'generation' in kwargs else 'any'
        hatchery_id = kwargs['hatchery_id'] if 'hatchery_id' in kwargs else 0
        house_id = kwargs['house_id'] if 'house_id' in kwargs else 0
        pen_id = kwargs['pen_id'] if 'pen_id' in kwargs else 0

        if (breed_id != 0):
            queryset = queryset.filter(breed=breed_id)

        if (generation != 'any'):
            queryset = queryset.filter(generation=generation)

        if (hatchery_id != 0):
            queryset = queryset.filter(hatchery=hatchery_id)

        if (house_id != 0):
            queryset = queryset.filter(house=house_id)

        if (pen_id != 0):
            queryset = queryset.filter(pen=pen_id)

        return queryset

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='start_week',
                description='Start Week',
                location=OpenApiParameter.QUERY,
                required=False,
                default=0,
                type=int),
            OpenApiParameter(
                name='end_week',
                description='End Week',
                location=OpenApiParameter.QUERY,
                required=False,
                default=20,
                type=int),
            OpenApiParameter(
                name='farm_id',
                description='farm',
                location=OpenApiParameter.QUERY,
                required=False,
                type=int),
            OpenApiParameter(
                name='breed_id',
                description='Breed id',
                location=OpenApiParameter.QUERY,
                required=False,
                type=int),
            OpenApiParameter(
                name='generation',
                description='Generation',
                location=OpenApiParameter.QUERY,
                required=False,
                type=int),
            OpenApiParameter(
                name='hatchery_id',
                description='Hatchery',
                location=OpenApiParameter.QUERY,
                required=False,
                type=int),
            OpenApiParameter(
                name='house_id',
                description='House',
                location=OpenApiParameter.QUERY,
                required=False,
                type=int),
            OpenApiParameter(
                name='pen_id',
                description='Pen',
                location=OpenApiParameter.QUERY,
                required=False,
                type=int),
        ]
    )
    def list(self, request, **kwargs):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 20))

        queryset = self.filter_by_directory(**kwargs)
        print('---------------')
        print(queryset)
        queryset_ids = list(zip(*queryset.values_list('id')))[0]

        results = []
        for week in range(start_week, end_week + 1):
            alive_female_chickens = queryset.filter(
                sex="F").exclude(hatch_date=None).annotate(
                    current_date=F('hatch_date')+timedelta(weeks=week)
            ).filter(current_date__lte=F('reduction_date')).count()

            weekly_eggs = Egg.objects.all().filter(
                chicken__in=queryset_ids,
                week=week).aggregate(sum=Sum('eggs'))['sum'] or 0

            results.append({
                'week': week,
                'no_of_chickens': alive_female_chickens,
                'no_of_eggs': weekly_eggs,
                'production': weekly_eggs / alive_female_chickens * 100 if alive_female_chickens != 0 else 0
            })

        return Response({'results': results})
