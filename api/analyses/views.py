import math
from django.shortcuts import render
from rest_framework import viewsets, mixins
import django_filters
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, F, Q, ExpressionWrapper, DecimalField, IntegerField, DurationField
from django_tenants.utils import tenant_context
from drf_spectacular.utils import extend_schema, OpenApiParameter
from django.db import connection
from datetime import timedelta, date, datetime
from rest_framework.exceptions import NotFound
import numpy as np
import uuid
import pandas as pd
from sklearn.ensemble import IsolationForest
from json import loads, dumps

from . import models
from . import serializers
from . import filters
from core.pagination import AllPagination
from core.schemas import ANALYSES_PARAMETERS
from eggs.models import Egg
from farms.models import Farm
from feeds.models import Feed
from weights.models import Weight
from chickens.models import Chicken
from users.models import User
from breeds.models import Breed
from .calculate_analyses import calculate_hdep, calculate_hhep, calculate_egg_mass
from eggs.serializers import EggSerializer_GET
from weights.serializers import WeightSerializer_GET
from feeds.serializers import FeedSerializer_GET
from chickens.models import Chicken
from hatchery.models import Hatchery
from breeds.models import Breed
from formulas.models import Formula
from ingredients.models import Ingredient
from nutrients.models import Nutrient
from requirements.models import Requirement


class AnalysesViewSet(viewsets.ViewSet):
    # queryset = Chicken.objects.all()
    farm = None

    def get_farm(self, farm_id):
        try:
            self.farm = Farm.objects.get(pk=farm_id)
            return self.farm
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
            queryset = queryset.filter(house=house_id)

        if (pen_id):
            queryset = queryset.filter(pen=pen_id)

        if (sex):
            queryset = queryset.filter(sex=sex)

        self.queryset = queryset

        return queryset

    def get_query_directory(self):
        """Return json of directory filters"""
        if (not self.queryset):
            return {}

        query_data = self.queryset[0]
        return {
            'farm': self.farm.display_name,
            'breed': query_data.breed.name if query_data.breed else None,
            'generation': query_data.generation,
            'hatchery': query_data.hatchery.display_name if query_data.hatchery else None,
            'house': query_data.pen.house.name if query_data.pen else None,
            'pen': query_data.pen.name if query_data.pen else None,
            'sex': query_data.sex
        }


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
        if (self.request.tenant.name == 'public'):
            return Response({
                'results': {
                    'user_count': User.objects.filter(farms__name__in=[self.request.tenant]).count(),
                    'total_users': User.objects.count(),
                    'farm_count': self.request.user.farms.all().count(),
                    'formula_count': Formula.objects.all().count(),
                    'ingredient_count': Ingredient.objects.all().count(),
                    'nutrient_count': Nutrient.objects.all().count(),
                    'requirement_count': Requirement.objects.all().count(),
                }
            })
        else:
            return Response({
                'results': {
                    'user_count': User.objects.filter(farms__name__in=[self.request.tenant]).count(),
                    'total_users': User.objects.count(),
                    'farm_count': self.request.user.farms.all().count(),
                    'total_farms': Farm.objects.count(),
                    'chicken_count': Chicken.objects.all().count(),
                    'hatchery_count': Hatchery.objects.all().count(),
                    'breed_count': Breed.objects.all().count(),
                    'formula_count': Formula.objects.all().count(),
                    'ingredient_count': Formula.objects.all().count(),
                    'nutrient_count': Nutrient.objects.all().count(),
                    'requirement_count': Requirement.objects.all().count(),
                }
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
        return Response({'geojson': []})


class PedigreeViewset(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    pagination_class = AllPagination
    serializer_class = serializers.PedigreeSerializer


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


class FeedByWeightViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        if (request.GET.get('chicken', None)):
            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))

            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            results = []
            for week in range(start_week, end_week + 1):
                feed_queryset = Feed.objects.filter(
                    chicken__in=queryset_ids, week=week, hatchery__isnull=True).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                weight_queryset = Weight.objects.filter(
                    chicken__in=queryset_ids, week=week).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                results.append({
                    'week': week,
                    'feed_average': "{:.3f}".format(feed_queryset),
                    'weight_average': "{:.3f}".format(weight_queryset)
                })

            return Response({'results': results})
        else:
            with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
                queryset = self.filter_by_directory()

                queryset_ids = list(zip(*queryset.values_list('id')))
                queryset_ids = queryset_ids if len(
                    queryset_ids) == 0 else queryset_ids[0]

                results = []
                for week in range(start_week, end_week + 1):
                    feed_queryset = Feed.objects.filter(
                        chicken__in=queryset_ids, week=week, hatchery__isnull=True).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                    weight_queryset = Weight.objects.filter(
                        chicken__in=queryset_ids, week=week).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                    results.append({
                        'week': week,
                        'feed_average': "{:.3f}".format(feed_queryset),
                        'weight_average': "{:.3f}".format(weight_queryset)
                    })

                return Response({'results': results})


class EggsViewSet(AnalysesViewSet):
    """Egg Weight by week 
    """
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        if (request.GET.get('chicken', None)):
            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))

            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            results = []
            for week in range(start_week, end_week + 1):
                # Convert total egg weight to individual egg weight
                egg_queryset = Egg.objects.filter(
                    chicken__in=queryset_ids, week=week).annotate(single_egg_weiht=F('weight') / F('eggs')).aggregate(avg_eggs=Avg('eggs'), avg_egg_weight=Avg('weight'))

                results.append({
                    'week': week,
                    'eggs_average': "{:.3f}".format(egg_queryset['avg_eggs'] or 0),
                    'avg_egg_weight': "{:.3f}".format(egg_queryset['avg_egg_weight'] or 0)
                })

            return Response({'results': results})
        else:
            with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
                queryset = self.filter_by_directory()

                queryset_ids = list(zip(*queryset.values_list('id')))
                queryset_ids = queryset_ids if len(
                    queryset_ids) == 0 else queryset_ids[0]

                results = []
                for week in range(start_week, end_week + 1):
                    egg_queryset = Egg.objects.filter(
                        chicken__in=queryset_ids, week=week).annotate(single_egg_weiht=F('weight') / F('eggs')).aggregate(avg_eggs=Avg('eggs'), avg_egg_weight=Avg('weight'))

                    results.append({
                        'week': week,
                        'eggs_average': "{:.3f}".format(egg_queryset['avg_eggs'] or 0),
                        'avg_egg_weight': "{:.3f}".format(egg_queryset['avg_egg_weight'] or 0)
                    })

                return Response({'results': results})


class EggGradingViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        if (request.GET.get('chicken', None)):
            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))

            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            results = []
            for week in range(start_week, end_week + 1):
                # Convert total egg weight to individual egg weight
                egg_queryset = Egg.objects.filter(
                    chicken__in=queryset_ids, week=week).annotate(single_egg_weight=F('weight') / F('eggs'))

                total_eggs = egg_queryset.aggregate(eggs_count=Sum('eggs'))[
                    'eggs_count'] or 0
                total_eggs = total_eggs if total_eggs != 0 else 1

                sm_grading = egg_queryset.filter(single_egg_weight__lt=53).aggregate(
                    total_eggs=Sum('eggs'))['total_eggs'] or 0
                m_grading = egg_queryset.filter(single_egg_weight__gt=52, single_egg_weight__lt=63).aggregate(
                    total_eggs=Sum('eggs'))['total_eggs'] or 0
                lg_grading = egg_queryset.filter(single_egg_weight__gt=62, single_egg_weight__lt=73).aggregate(
                    total_eggs=Sum('eggs'))['total_eggs'] or 0
                xl_grading = egg_queryset.filter(single_egg_weight__gt=72).aggregate(
                    total_eggs=Sum('eggs'))['total_eggs'] or 0

                results.append({
                    'week': week,
                    'total_sm_count': sm_grading,
                    'sm_grading': "{:.3f}".format(sm_grading/total_eggs * 100),

                    'total_m_grading': m_grading,
                    'm_grading': "{:.3f}".format(m_grading/total_eggs * 100),

                    'total_lg_grading': lg_grading,
                    'lg_grading': "{:.3f}".format(lg_grading/total_eggs * 100),

                    'total_xl_grading': xl_grading,
                    'xl_grading': "{:.3f}".format(xl_grading/total_eggs * 100),
                })

            return Response({'results': results})
        else:
            with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
                queryset = self.filter_by_directory()

                queryset_ids = list(zip(*queryset.values_list('id')))
                queryset_ids = queryset_ids if len(
                    queryset_ids) == 0 else queryset_ids[0]

                results = []
                for week in range(start_week, end_week + 1):
                    # Convert total egg weight to individual egg weight
                    egg_queryset = Egg.objects.filter(
                        chicken__in=queryset_ids, week=week).annotate(single_egg_weight=F('weight') / F('eggs'))

                    total_eggs = egg_queryset.aggregate(eggs_count=Sum('eggs'))[
                        'eggs_count'] or 0
                    total_eggs = total_eggs if total_eggs != 0 else 1

                    sm_grading = egg_queryset.filter(single_egg_weight__lt=53).aggregate(
                        total_eggs=Sum('eggs'))['total_eggs'] or 0
                    m_grading = egg_queryset.filter(single_egg_weight__gt=52, single_egg_weight__lt=63).aggregate(
                        total_eggs=Sum('eggs'))['total_eggs'] or 0
                    lg_grading = egg_queryset.filter(single_egg_weight__gt=62, single_egg_weight__lt=73).aggregate(
                        total_eggs=Sum('eggs'))['total_eggs'] or 0
                    xl_grading = egg_queryset.filter(single_egg_weight__gt=72).aggregate(
                        total_eggs=Sum('eggs'))['total_eggs'] or 0

                    results.append({
                        'week': week,
                        'total_sm_count': sm_grading,
                        'sm_grading': "{:.3f}".format(sm_grading/total_eggs * 100),

                        'total_m_grading': m_grading,
                        'm_grading': "{:.3f}".format(m_grading/total_eggs * 100),

                        'total_lg_grading': lg_grading,
                        'lg_grading': "{:.3f}".format(lg_grading/total_eggs * 100),

                        'total_xl_grading': xl_grading,
                        'xl_grading': "{:.3f}".format(xl_grading/total_eggs * 100),
                    })

                return Response({'results': results})


class WeightGraphViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        if (request.GET.get('chicken', None)):
            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))

            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            results = []
            for week in range(start_week, end_week + 1):
                weight_avg = Weight.objects.filter(
                    chicken__in=queryset_ids, week=week).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                results.append({
                    'week': week,
                    'weight': "{:.3f}".format(weight_avg)
                })

            return Response({'results': results})
        else:
            with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
                queryset = self.filter_by_directory()

                queryset_ids = list(zip(*queryset.values_list('id')))
                queryset_ids = queryset_ids if len(
                    queryset_ids) == 0 else queryset_ids[0]

                results = []
                for week in range(start_week, end_week + 1):
                    weight_avg = Weight.objects.filter(
                        chicken__in=queryset_ids, week=week).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                    results.append({
                        'week': week,
                        'weight': "{:.3f}".format(weight_avg)
                    })

                return Response({'results': results})


class FeedGraphViewSet(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        start_week = int(self.request.GET.get('start_week', 0))
        end_week = int(self.request.GET.get('end_week', 20))

        if (request.GET.get('chicken', None)):
            queryset = Chicken.all.filter(
                pk=self.request.GET.get('chicken', 0))

            queryset_ids = list(zip(*queryset.values_list('id')))
            queryset_ids = queryset_ids if len(
                queryset_ids) == 0 else queryset_ids[0]

            results = []
            for week in range(start_week, end_week + 1):
                weight_avg = Feed.objects.filter(
                    chicken__in=queryset_ids, week=week).aggregate(weight_avg=Avg('weight'))['weight_avg'] or 0

                results.append({
                    'week': week,
                    'weight': "{:.3f}".format(weight_avg)
                })

            return Response({'results': results})
        else:
            with tenant_context(self.get_farm(self.request.GET.get('farm', 0))):
                queryset = self.filter_by_directory()

                queryset_ids = list(zip(*queryset.values_list('id')))
                queryset_ids = queryset_ids if len(
                    queryset_ids) == 0 else queryset_ids[0]

                results = []
                for week in range(start_week, end_week + 1):
                    weight_avg = Feed.objects.filter(chicken__in=queryset_ids, week=week, hatchery__isnull=True).aggregate(
                        weight_avg=Avg('weight'))['weight_avg'] or 0

                    results.append({
                        'week': week,
                        'weight': "{:.3f}".format(weight_avg)
                    })

                return Response({'results': results})


class MortalityViewSet(AnalysesViewSet):
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

            duration = ExpressionWrapper(
                F('reduction_date') - F('hatch_date'), output_field=DurationField())
            queryset = queryset.filter(~Q(hatch_date=None)).annotate(
                duration=duration)

            total_chickens = queryset.count()

            results = []
            for week in range(start_week, end_week + 1):
                current_queryset = queryset.filter(
                    duration__gte=timedelta(weeks=week-1),
                    duration__lte=timedelta(weeks=week))

                alive_chickens = queryset.exclude(
                    duration__gte=timedelta(weeks=week)).count()
                dead_chickens = current_queryset.count()

                # if reduction_reason_id == 0:
                #     dead_chickens = current_queryset.filter(
                #         reduction_reason=reduction_reason_id).count()
                # else:
                #     dead_chickens = current_queryset.count()

                mortality = dead_chickens/total_chickens * 100 if total_chickens != 0 else 0
                livability = alive_chickens/total_chickens * 100 if total_chickens != 0 else 0

                results.append({
                    'id': uuid.uuid4(),
                    **self.get_query_directory(),
                    'week': week,
                    'mortality': "{:.3f}".format(mortality),
                    'livability': "{:.3f}".format(livability),
                })

            return Response({'results': results})


class ChickenRanking(mixins.RetrieveModelMixin,
                     mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = models.ChickenRanking.objects.all()
    serializer_class = serializers.ChickenRankingSerializer
    filterset_class = filters.ChickenRankingFilter


class ChickenRecordSet(mixins.RetrieveModelMixin,
                     mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = models.ChickenRecordset.objects.all()
    serializer_class = serializers.ChickenRecordSetSerializer
    filterset_class = filters.ChickenRecordSetFilter


class ChickensSummary(AnalysesViewSet):
    def list(self, request, **kwargs):
        queryset = self.filter_by_directory(**kwargs)
        
        return Response({
            'total_chickens': queryset.count(),
            'chicken': {
                'total': queryset.count(),
                'alive': queryset.filter(reduction_date__isnull=True).count(),
                'dead': queryset.filter(reduction_date__isnull=False).count()
            },
            'sex': {
               'M': queryset.filter(sex="M").count(),
               'F': queryset.filter(sex="F").count(),
               'Unknown': queryset.filter(sex__isnull=True).count()
            },
            'hatch_date': {
                'seted': queryset.filter(hatch_date__isnull=False).count(),
                'unseted': queryset.filter(hatch_date__isnull=True).count()
            },
            'pedigree': {
                'sire_dam_seted': queryset.filter(sire__isnull=False, dam__isnull=False).count(),
                'sire_dam_unseted': queryset.filter(sire__isnull=True, dam__isnull=True).count(),
                'sire_seted': queryset.filter(sire__isnull=False, dam__isnull=True).count(),
                'dam_seted': queryset.filter(sire__isnull=True, dam__isnull=False).count(),
            },
        })

class ChickenRecordSetQuality(AnalysesViewSet):
    """Data Quality, answers how many data has been collected in the given week"""
    def list(self, request, **kwargs):
        chickens_queryset = self.filter_by_directory(**kwargs)
        queryset = models.ChickenRecordset.objects.filter(
            chicken__in = chickens_queryset.values_list('id', flat=True)
        )
        
        df = pd.DataFrame(queryset.values())
        df = df.fillna(0)
                
        results = []
        
        total_chickens = chickens_queryset.count()
        
          #     alive_in_current_week_chickens = chickens_queryset.exclude(hatch_date=None).annotate(
        #                 current_date=F('hatch_date')+timedelta(weeks=week)
        #         ).filter(Q(current_date__lte=F('reduction_date')) | Q(reduction_date=None))
            
        #     weekly_recordset = queryset.filter(week=week)


        #     total_chickens = chickens_queryset.count()
        #     alive_chickens = int(alive_in_current_week_chickens.count())
        #     dead_chickens = int(total_chickens) - int(alive_chickens)
        
        for week, group in df.groupby('week'):
            df_body_weight = group[group['body_weight'] != 0].copy(deep=True)
            df_body_weight['body_weight'] = df_body_weight['body_weight'].astype(float)

            df_feed_intake = group[group['feed_weight'] != 0].copy(deep=True)
            df_feed_intake['feed_weight'] = df_feed_intake['feed_weight'].astype(float)

            df_eggs = group[group['no_eggs'] != 0].copy(deep=True)
            df_eggs['no_eggs'] = df_eggs['no_eggs'].astype(float)

            df_eggs_weight = group[group['eggs_weight'] != 0].copy(deep=True)
            df_eggs_weight['eggs_weight'] = df_eggs_weight['eggs_weight'].astype(float)
    
            results.append({
                'week': week,
                'chicken': {
                    'total': total_chickens,
                },
                'body_weight': {
                    'recorded': df_body_weight.shape[0],
                    'missing': group[group['body_weight'] == 0].shape[0],
                    **df_body_weight.describe()['body_weight'].fillna(0).round(3).to_dict()
                },
                'feed_intake': {
                    'recorded': df_feed_intake.shape[0],
                    'missing': group[group['feed_weight'] == 0].shape[0],
                    **df_feed_intake.describe()['feed_weight'].fillna(0).round(3).to_dict()
                },
                'eggs': {
                    'recorded': df_eggs.shape[0],
                    'missing': group[group['no_eggs'] == 0].shape[0],
                    **df_eggs.describe()['no_eggs'].fillna(0).round(3).to_dict()
                },
                'eggs_weight': {
                    'recorded': df_eggs_weight.shape[0],
                    'missing': group[group['eggs_weight'] == 0].shape[0],
                    **df_eggs_weight.describe()['eggs_weight'].fillna(0).round(3).to_dict()
                },
            })

        return Response({'results': results})
        
class MortalityRate(AnalysesViewSet):
    @extend_schema(
        parameters=ANALYSES_PARAMETERS
    )
    def list(self, request, **kwargs):
        queryset = self.filter_by_directory()
        
        duration = ExpressionWrapper(
            F('reduction_date') - F('hatch_date'), output_field=DurationField())
        queryset = queryset.filter(~Q(hatch_date=None)).annotate(
            duration=duration)
        
            
        ages = queryset.exclude(duration__isnull=True).values_list('duration', flat=True)
        min_age = np.min(ages)
        min_age = math.floor(min_age.days / 7)  if isinstance(min_age, timedelta) else 0

        max_age = np.max(ages)
        max_age = math.floor(max_age.days / 7) + 1 if isinstance(max_age, timedelta) else 0

        total_chickens = queryset.count()
                
        results = []
        for week in range(min_age, max_age):
            dead_chickens = queryset.filter(
                duration__gte=timedelta(weeks=week-1),
                duration__lte=timedelta(weeks=week)).count()

            alive_chickens = queryset.exclude(
                duration__lte=timedelta(weeks=week)).count()
            # alive_chickens = queryset.exclude(
            #     duration__gte=timedelta(weeks=week)).count()
    
            mortality = dead_chickens/total_chickens * 100 if total_chickens != 0 else 0
            livability = alive_chickens/total_chickens * 100 if total_chickens != 0 else 0

            results.append({
                'id': uuid.uuid4(),
                'week': week,
                'chickens': {
                    "total": total_chickens,
                },
                'mortality': {
                    "total": dead_chickens,
                    "rate": "{:.3f}".format(mortality),
                },
                'livability': {
                    "total": alive_chickens,
                    "rate": "{:.3f}".format(livability),
                }
            })

        return Response({'results': results})