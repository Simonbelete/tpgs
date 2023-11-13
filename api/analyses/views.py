from django.shortcuts import render
from rest_framework import viewsets, status
import django_filters
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, F, Q, ExpressionWrapper, DecimalField, IntegerField, DurationField
from django_tenants.utils import tenant_context
from drf_spectacular.utils import extend_schema, OpenApiParameter
from django.db import connection
from datetime import timedelta, date
from rest_framework.exceptions import NotFound
import numpy as np

from . import models
from . import serializers
from core.schemas import ANALYSES_PARAMETERS
from eggs.models import Egg
from farms.models import Farm
from feeds.models import Feed
from weights.models import Weight
from chickens.models import Chicken
from users.models import User
from breeds.models import Breed
from .calculate_analyses import calculate_hdep, calculate_hhep, calculate_egg_mass


class AnalysesViewSet(viewsets.ViewSet):
    def get_farm(self, farm_id):
        try:
            return Farm.objects.get(pk=farm_id)
        except Farm.DoesNotExist:
            raise NotFound("Farm Not found")

    def filter_by_directory(self):
        queryset = Chicken.objects.all()

        breed_id = self.request.GET.get('breed', None)
        generation = self.request.GET.get('generation', None)
        hatchery_id = self.request.GET.get('hatchery', None)
        house_id = self.request.GET.get('house', None)
        pen_id = self.request.GET.get('pen', None)
        sex = self.request.GET.get('sex', None)

        if (breed_id):
            queryset = queryset.filter(breed=breed_id)

        if (generation):
            queryset = queryset.filter(generation=generation)

        if (hatchery_id):
            queryset = queryset.filter(hatchery=hatchery_id)

        if (house_id):
            queryset = queryset.filter(pen__house=house_id)

        if (pen_id):
            queryset = queryset.filter(pen=pen_id)

        if (sex):
            queryset = queryset.filter(sex=sex)

        return queryset


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


class HDEPViewSet(AnalysesViewSet):
    def get_by_flock(self):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            queryset = self.filter_by_directory()
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            eggs_queryset = Egg.objects.filter(chicken__in=queryset_ids)
            results = []
            for week in range(start_week, end_week + 1):
                res = calculate_hdep(queryset, eggs_queryset, week)
                results.append(res)

            return Response({'results': results})

    def get_by_chicken(self):
        try:
            start_week = int(self.request.GET.get('start_week', 0))
            end_week = int(self.request.GET.get('end_week', 20))

            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            eggs_queryset = Egg.objects.filter(chicken__in=queryset_ids)
            results = []
            for week in range(start_week, end_week + 1):
                res = calculate_hdep(queryset, eggs_queryset, week)
                results.append(res)

            return Response({'results': results})
        except Chicken.DoesNotExist:
            raise NotFound('Chicken not found')

    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        if (request.GET.get('chicken', None)):
            return self.get_by_chicken()
        else:
            return self.get_by_flock()


class HHEPViewSet(AnalysesViewSet):
    def get_by_flock(self):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            queryset = self.filter_by_directory()
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            eggs_queryset = Egg.objects.filter(chicken__in=queryset_ids)
            results = []
            for week in range(start_week, end_week + 1):
                res = calculate_hhep(queryset, eggs_queryset, week)
                results.append(res)

            return Response({'results': results})

    def get_by_chicken(self):
        try:
            start_week = int(self.request.GET.get('start_week', 0))
            end_week = int(self.request.GET.get('end_week', 20))

            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            eggs_queryset = Egg.objects.filter(chicken__in=queryset_ids)
            results = []
            for week in range(start_week, end_week + 1):
                res = calculate_hhep(queryset, eggs_queryset, week)
                results.append(res)

            return Response({'results': results})

        except Chicken.DoesNotExist:
            raise NotFound('Chicken not found')

    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        if (request.GET.get('chicken', None)):
            return self.get_by_chicken()
        else:
            return self.get_by_flock()


class EggMassViewSet(AnalysesViewSet):
    def get_by_flock(self):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            queryset = self.filter_by_directory()
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            eggs_queryset = Egg.objects.filter(chicken__in=queryset_ids)
            results = []
            for week in range(start_week, end_week + 1):
                res = calculate_egg_mass(queryset, eggs_queryset, week)
                results.append(res)

            return Response({'results': results})

    def get_by_chicken(self):
        try:
            start_week = int(self.request.GET.get('start_week', 0))
            end_week = int(self.request.GET.get('end_week', 20))

            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            eggs_queryset = Egg.objects.filter(chicken__in=queryset_ids)
            results = []
            for week in range(start_week, end_week + 1):
                res = calculate_egg_mass(queryset, eggs_queryset, week)
                results.append(res)

            return Response({'results': results})

        except Chicken.DoesNotExist:
            raise NotFound('Chicken not found')

    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        if (request.GET.get('chicken', None)):
            return self.get_by_chicken()
        else:
            return self.get_by_flock()


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

    def filter_by_directory(self):
        queryset = Chicken.objects.all()

        breed_id = self.request.GET.get('breed', None)
        generation = self.request.GET.get('generation', None)
        hatchery_id = self.request.GET.get('hatchery', None)
        house_id = self.request.GET.get('house', None)
        pen_id = self.request.GET.get('pen', None)
        sex = self.request.GET.get('sex', None)

        if (breed_id):
            queryset = queryset.filter(breed=breed_id)

        if (generation):
            queryset = queryset.filter(generation=generation)

        if (hatchery_id):
            queryset = queryset.filter(hatchery=hatchery_id)

        if (house_id):
            queryset = queryset.filter(pen__house=house_id)

        if (pen_id):
            queryset = queryset.filter(pen=pen_id)

        if (sex):
            queryset = queryset.filter(sex=sex)

        return queryset

    def get_farm(self, farm_id):
        try:
            return Farm.objects.get(pk=farm_id)
        except Farm.DoesNotExist:
            raise NotFound("Farm Not found")

    def get_by_flock(self):
        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            start_week = int(self.request.GET.get('start_week', 0))
            end_week = int(self.request.GET.get('end_week', 20))

            queryset = self.filter_by_directory()
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            results = []
            for week in range(start_week, end_week + 1):
                alive_female_chickens = queryset.filter(
                    sex="F").exclude(hatch_date=None).annotate(
                        current_date=F('hatch_date')+timedelta(weeks=week)
                ).filter(Q(current_date__lte=F('reduction_date')) | Q(reduction_date=None)).count()

                # Total Sum of eggs
                weekly_eggs = Egg.objects.all().filter(
                    chicken__in=queryset_ids,
                    week=week).aggregate(sum=Sum('eggs'))['sum'] or 0

                # Number of layer chickens
                weekly_layers = Egg.objects.all().filter(
                    chicken__in=queryset_ids, eggs__gt=0,
                    week=week).count()

                production = weekly_layers / alive_female_chickens * \
                    100 if alive_female_chickens != 0 else 0

                results.append({
                    'week': week,
                    'no_of_chickens': alive_female_chickens,
                    'no_of_eggs': weekly_eggs,
                    'no_of_layers': weekly_layers,
                    'production': "{:.3f}".format(production)
                })

            return Response({'results': results})

    def get_by_chicken(self):
        try:
            start_week = int(self.request.GET.get('start_week', 0))
            end_week = int(self.request.GET.get('end_week', 20))

            results = []
            for week in range(start_week, end_week + 1):
                chicken = Chicken.all.filter(
                    pk=self.request.GET.get('chicken', 0), sex="F").exclude(hatch_date=None).annotate(
                    current_date=F('hatch_date')+timedelta(weeks=week)
                ).filter(Q(current_date__lte=F('reduction_date')) | Q(reduction_date=None))

                chicken_ids = list(zip(*chicken.values_list('id')))
                chicken_ids = chicken_ids if len(
                    chicken_ids) == 0 else chicken_ids[0]

                alive_female_chickens = chicken.count()

                # Total Number of eggs
                weekly_eggs = Egg.objects.all().filter(
                    chicken__in=chicken_ids,
                    week=week).aggregate(sum=Sum('eggs'))['sum'] or 0

                # Number of layer chickens
                weekly_layers = Egg.objects.all().filter(
                    chicken__in=chicken_ids, eggs__gt=0,
                    week=week).count()

                production = weekly_layers / alive_female_chickens * \
                    100 if alive_female_chickens != 0 else 0

                results.append({
                    'week': week,
                    'no_of_chickens': alive_female_chickens,
                    'no_of_eggs': weekly_eggs,
                    'no_of_layers': weekly_layers,
                    'production': "{:.3f}".format(production)
                })
            return Response({'results': results})
        except Chicken.DoesNotExist:
            raise NotFound('Chicken not found')

    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        if (request.GET.get('chicken', None)):
            return self.get_by_chicken()
        else:
            return self.get_by_flock()


class FCRE(AnalysesViewSet):
    """Feed Conversion ratio for eggs
    """

    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        start_week = int(request.GET.get('start_week', 0))
        end_week = int(request.GET.get('end_week', 20))

        with tenant_context(self.get_farm(request.GET.get('farm_id', 0))):
            queryset = self.filter_by_directory(**kwargs)
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            # all_chickens_queryset =

            eggs_queryset = Egg.objects.filter(chicken__in=queryset_ids)

            batch_feeds_queryset = Feed.objects.filter(week=week)

            results = []
            for week in range(start_week, end_week + 1):
                batch_feeds_queryset = Feed.objects.filter(week=week)
                individual_queyset = Feed.objects.filter(
                    chicken__in=queryset_ids)

                if (request.GET.get('hatchery_id', 0) != 0):
                    batch_feeds_queryset = batch_feeds_queryset.filter(
                        hatchery=request.GET.get('hatchery_id'))

                if (request.GET.get('pen_id', 0) != 0):
                    batch_feeds_queryset = batch_feeds_queryset.filter(
                        hatchery=request.GET.get('pen_id'))

                batches_weight = batch_feeds_queryset.aggregate(
                    weight_sum=Sum('weight'))['weight_sum'] or 0

                chickens_weight = individual_queyset.aggregate(
                    weight_sum=Sum('weight'))['weight_sum'] or 0

                total_chickens = queryset.count()
                total_weight = (batches_weight /
                                total_chickens) + chickens_weight

                weekly_no_eggs = eggs_queryset.filter(week=week).aggregate(
                    sum=Sum('eggs'))['sum'] or 0
                fcr = total_weight / weekly_no_eggs if weekly_no_eggs != 0 else 0

                results.append({
                    'week': week,
                    'fcr': fcr
                })
            return Response({'results': results})


class FCRW(viewsets.ViewSet):
    """Feed Conversion ratio for body weiht/ weight gain
    """
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

    def get_farm(self, farm_id):
        try:
            return Farm.objects.get(pk=farm_id)
        except Farm.DoesNotExist:
            raise NotFound

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

        with tenant_context(self.get_farm(request.GET.get('farm_id', 0))):
            queryset = self.filter_by_directory(**kwargs)
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            weight_queryset = Weight.objects.filter(chicken__in=queryset_ids)
            results = []
            for week in range(start_week, end_week + 1):
                previous_week_avg = weight_queryset.filter(
                    week=week - 1).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0
                current_week_avg = weight_queryset.filter(
                    week=week).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                # Feed Intake
                batch_feeds_queryset = Feed.objects.filter(week=week)
                individual_queyset = Feed.objects.filter(
                    chicken__in=queryset_ids)

                if (request.GET.get('hatchery_id', 0) != 0):
                    batch_feeds_queryset = batch_feeds_queryset.filter(
                        hatchery=request.GET.get('hatchery_id'))

                if (request.GET.get('pen_id', 0) != 0):
                    batch_feeds_queryset = batch_feeds_queryset.filter(
                        hatchery=request.GET.get('pen_id'))

                batches_weight = batch_feeds_queryset.aggregate(
                    weight_sum=Sum('weight'))['weight_sum'] or 0

                chickens_weight = individual_queyset.aggregate(
                    weight_sum=Sum('weight'))['weight_sum'] or 0

                total_chickens = queryset.count()
                total_feed_weight = (batches_weight /
                                     total_chickens) + chickens_weight

                weight_gain = current_week_avg - previous_week_avg
                fcr = total_feed_weight / weight_gain if weight_gain != 0 else 0

                results.append({
                    'week': week,
                    'previous_week_avg': previous_week_avg,
                    'current_week_avg': current_week_avg,
                    'weight_gain': weight_gain,
                    'fcr': fcr
                })
            return Response({'results': results})


class GenderDistributionViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            queryset = self.filter_by_directory()

            return Response({'results': {
                'total_count': queryset.count(),
                'total_male_count': queryset.filter(sex="M").count(),
                'total_female_count': queryset.filter(sex="F").count(),
                'total_other_count': queryset.filter(Q(sex__isnull=True) | Q(sex__exact="")).count()
            }})


# TODO: set pagination
class BreedDistributionViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            queryset = self.filter_by_directory()
            total_chicken_count = queryset.count()

            breed_queryset = Breed.objects.all()

            results = []
            for breed in breed_queryset.iterator():
                total_count = queryset.filter(breed=breed).count()
                percentage = total_count / total_chicken_count * \
                    100 if total_chicken_count != 0 else 0
                results.append({'id': breed.id, 'name': breed.name, 'total_chicken_count': total_chicken_count,
                               'total_count': total_count, 'percentage': percentage})

            return Response({'results': results})


class ChickenAgeGroupViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            queryset = self.filter_by_directory()

            unknown_chickens = queryset.filter(Q(hatch_date=None))

            duration = ExpressionWrapper(
                date.today() - F('hatch_date'), output_field=DurationField())
            queryset = queryset.filter(~Q(hatch_date=None)).annotate(
                duration=duration)

            return Response({'results': {
                'labels': ['0-16 weeks', '16-20 weeks', '12 months', '12-18 months', '2+ years', 'Unknown'],
                'data': [
                    queryset.filter(duration__gte=timedelta(days=0),
                                    duration__lte=timedelta(days=112)).count(),
                    queryset.filter(duration__gte=timedelta(days=113),
                                    duration__lte=timedelta(days=140)).count(),
                    queryset.filter(duration__gte=timedelta(days=365),
                                    duration__lte=timedelta(days=395)).count(),
                    queryset.filter(duration__gte=timedelta(days=365),
                                    duration__lte=timedelta(days=547)).count(),
                    queryset.filter(duration__gte=timedelta(days=730)).count(),
                    unknown_chickens.count()
                ]
            }})


class GrowthPerformanceViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
            queryset = self.filter_by_directory()
            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            results = []
            for week in range(start_week, end_week + 1):
                weights = Weight.objects.filter(
                    week=week, chicken__in=queryset_ids)
                weights = list(zip(*weights.values_list('weight')))
                weights = queryset_ids if len(
                    weights) == 0 else weights[0]

                avg = np.average(weights)
                std = np.std(weights)

                results.append({
                    'week': week,
                    'average': "{:.3f}".format(avg),
                    'std': "{:.3f}".format(std),
                    'error': "{:.3f}".format(std)
                })

            return Response({'results': results})
