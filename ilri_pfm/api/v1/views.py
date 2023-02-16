import io
import json
import numpy as np
from decimal import Decimal
import matplotlib.pyplot as plt
from collections import OrderedDict
from rest_framework import viewsets, status
from django.views.decorators.http import require_http_methods
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters import rest_framework as filters
from django.http import Http404, HttpResponse
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, Sum

import api.models as models
from api.v1 import serializers


class LimitPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'limit'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))


class DataTablePageNumberPagination(PageNumberPagination):
    page_size_query_param = 'limit'

    def get_paginated_response(self, data, search):
        return Response(OrderedDict([
            ('recordsTotal', self.page.paginator.count),
            ('recordsFiltered', self.page.paginator.count),

            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data),
            ('searchPanes', search)
        ]))

############################ Country ############################


class UserFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.User
        fields = ['name']


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = UserFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    # def perform_create(self, serializer):
    #     serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.UserSerializer_GET_V1
        return serializers.UserSerializer_POST_V1


############################ Country ############################


class CountryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Country
        fields = ['name']


class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = CountryFilter
    pagination_class = LimitPageNumberPagination
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.CountrySerializer_GET_V1
        return serializers.CountrySerializer_POST_V1


############################ City ############################

class CityFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.City
        fields = ['name']


class CityViewSet(viewsets.ModelViewSet):
    queryset = models.City.objects.all()
    serializer_class = serializers.CitySerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = CityFilter
    search_fields = ['name']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.CitySerializer_GET_V1
        return serializers.CitySerializer_POST_V1


############################ Farm ############################

class FarmFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Farm
        fields = ['name']


class FarmViewSet(viewsets.ModelViewSet):
    queryset = models.Farm.objects.all()
    serializer_class = serializers.FarmSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = FarmFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.FarmSerializer_GET_V1
        return serializers.FarmSerializer_POST_V1


class FarmHistoryViewSet(viewsets.ModelViewSet):
    queryset = models.Farm.history.all()
    serializer_class = serializers.FarmHistory
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    search_fields = ['name']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(id=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


############################ House ############################

class HouseFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.House
        fields = ['name']


class HouseViewSet(viewsets.ModelViewSet):
    queryset = models.House.objects.all()
    serializer_class = serializers.HouseSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = HouseFilter
    search_fields = ['name', 'farm']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.HouseSerializer_GET_V1
        return serializers.HouseSerializer_POST_V1


############################ Breed Type ############################

class BreedTypeFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.BreedType
        fields = ['name']


class BreedTypeViewSet(viewsets.ModelViewSet):
    queryset = models.BreedType.objects.all()
    serializer_class = serializers.BreedTypeSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = BreedTypeFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.BreedTypeSerializer_GET_V1
        return serializers.BreedTypeSerializer_POST_V1


############################ Stages ############################

class StageFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Stage
        fields = ['name']


class StageViewSet(viewsets.ModelViewSet):
    queryset = models.Stage.objects.all()
    serializer_class = serializers.StageSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = StageFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.StageSerializer_GET_V1
        return serializers.StageSerializer_POST_V1


############################ Layed Place ############################

class LayedPlaceFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.LayedPlace
        fields = ['name']


class LayedPlaceViewSet(viewsets.ModelViewSet):
    queryset = models.LayedPlace.objects.all()
    serializer_class = serializers.LayedPlaceSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = LayedPlaceFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.LayedPlaceSerializer_GET_V1
        return serializers.LayedPlaceSerializer_POST_V1

############################ Weight ############################


class WeightFilter(filters.FilterSet):
    start_week = filters.CharFilter(field_name='week', lookup_expr='gte')
    end_week = filters.CharFilter(field_name='week', lookup_expr='lte')
    chicken = filters.CharFilter(field_name='chicken', lookup_expr='exact')

    class Meta:
        model = models.Weight
        fields = ['start_week', 'end_week', 'chicken']


class WeightViewSet(viewsets.ModelViewSet):
    queryset = models.Weight.objects.all()
    serializer_class = serializers.WeightSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = WeightFilter
    search_fields = ['chicken__tag']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.WeightSerializer_GET_V1
        return serializers.WeightSerializer_POST_V1


class WeightHistoryViewSet(viewsets.ModelViewSet):
    queryset = models.Weight.history.all()
    serializer_class = serializers.WeightHistory
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    search_fields = ['name']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(id=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


############################ Chicken ############################

class ChickenFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')
    farm = filters.CharFilter(field_name='farm', lookup_expr='exact')
    flock = filters.CharFilter(field_name='flock', lookup_expr='exact')
    breed_type = filters.CharFilter(
        field_name='breed_type', lookup_expr='exact')
    sex = filters.CharFilter(field_name='sex', lookup_expr='exact')

    class Meta:
        model = models.Chicken
        fields = ['tag', 'farm', 'flock', 'sex', 'breed_type']


class ChickenViewSet(viewsets.ModelViewSet):
    queryset = models.Chicken.objects.all()
    serializer_class = serializers.ChickenSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = ChickenFilter
    search_fields = ['tag']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.ChickenSerializer_GET_V1
        return serializers.ChickenSerializer_POST_V1


class ChickenStaticsViewSet(viewsets.ModelViewSet):
    queryset = models.Chicken.objects.all()
    serializer_class = serializers.ChickenSerializer_GET_V1

    def list(self, request, *args, **kwargs):
        id = self.kwargs['id']
        latest_weight = models.Weight.objects.all().filter(chicken=id).latest('week')
        total_feed = models.Feed.objects.filter(
            chicken=id).aggregate(feed_sum=Sum('weight'))
        fcr = 0
        feed = 0
        if (latest_weight.weight and total_feed):
            if (total_feed['feed_sum'] != None):
                feed = total_feed['feed_sum']
            fcr = latest_weight.weight / (feed if feed != 0 else 1)
            fcr = round(fcr, 2)
        return Response({
            'weight': serializers.WeightSerializer_GET_V1(latest_weight).data,
            'total_egg': 0,
            'fcr': fcr,
            'total_feed': feed
        }, status=status.HTTP_200_OK)


class ChickenHistoryViewSet(viewsets.ModelViewSet):
    queryset = models.Chicken.history.all()
    serializer_class = serializers.ChickenHistory
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    search_fields = ['name']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(id=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ChickenWeightsViewSet(viewsets.ModelViewSet):
    queryset = models.Weight.objects.all()
    serializer_class = serializers.WeightSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = WeightFilter

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(chicken=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


############################ Breed Pair ############################

class BreedPairFilter(filters.FilterSet):

    class Meta:
        model = models.BreedPair
        fields = ''


class BreedPairViewSet(viewsets.ModelViewSet):
    queryset = models.BreedPair.objects.all()
    serializer_class = serializers.BreedPairSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = BreedPairFilter
    search_fields = ['tag']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.BreedPairSerializer_GET_V1
        return serializers.BreedPairSerializer_POST_V1


############################ Egg ############################

class EggFilter(filters.FilterSet):

    class Meta:
        model = models.Egg
        fields = ''


class EggViewSet(viewsets.ModelViewSet):
    queryset = models.Egg.objects.all()
    serializer_class = serializers.EggSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = EggFilter
    search_fields = ['date']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.EggSerializer_GET_V1
        return serializers.EggSerializer_POST_V1


############################ Feed Type ############################

class FeedTypeFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.FeedType
        fields = ['name']


class FeedTypeViewSet(viewsets.ModelViewSet):
    queryset = models.FeedType.objects.all()
    serializer_class = serializers.FeedTypeSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = FeedTypeFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.FeedTypeSerializer_GET_V1
        return serializers.FeedTypeSerializer_POST_V1


############################ Feed ############################

class FeedFilter(filters.FilterSet):

    class Meta:
        model = models.Feed
        fields = ''


class FeedViewSet(viewsets.ModelViewSet):
    queryset = models.Feed.objects.all()
    serializer_class = serializers.FeedSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = FeedFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.FeedSerializer_GET_V1
        return serializers.FeedSerializer_POST_V1


class FeedHistoryViewSet(viewsets.ModelViewSet):
    queryset = models.Feed.history.all()
    serializer_class = serializers.FeedHistory
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    search_fields = ['chicken']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(id=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


############################ Flock ############################

class FlockFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Flock
        fields = ['name']


class FlockViewSet(viewsets.ModelViewSet):
    queryset = models.Flock.objects.all()
    serializer_class = serializers.FlockSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = FlockFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.FlockSerializer_GET_V1
        return serializers.FlockSerializer_POST_V1


class FlockHistoryViewSet(viewsets.ModelViewSet):
    queryset = models.Flock.history.all()
    serializer_class = serializers.FlockHistory
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    search_fields = ['name']
    ordering_fields = '__all__'
    pagination_class = LimitPageNumberPagination

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(id=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# ##########################33


class StaticsCount(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer_GET_V1
    pagination_class = None

    def list(self, request, *args, **kwargs):
        try:
            users_count = models.User.objects.count()
            flocks_count = models.Flock.objects.count()
            farms_count = models.Farm.objects.count()
            chicken_count = models.Chicken.objects.count()
            eggs_count = models.Egg.objects.count()
            return Response({
                'users_count': users_count,
                'flocks_count': flocks_count,
                'farms_count': farms_count,
                'chicken_count': chicken_count,
                'eggs_count': eggs_count
            }, status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()


class StaticsBreedType(viewsets.ModelViewSet):
    queryset = models.BreedType.objects.annotate(
        chicken_count=Count('chickens'))
    serializer_class = serializers.BreedTypeSerializer_Statics
    pagination_class = None

    def list(self, request, *args, **kwargs):
        try:
            return Response({
                'chicken_count': models.Chicken.objects.count(),
                'results': self.get_serializer(self.queryset, many=True).data
            }, status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()


@require_http_methods(["GET"])
def breed_type_statics(request):
    # breed_types = models.BreedType.objects.annotate(
    #     chicken_count=Count('chickens'))
    # return Response({
    #     'chicken_count': models.Chicken.objects.count(),
    #     'results': serializers.BreedTypeSerializer_GET_V1(breed_types, many=True).data},
    #     status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_200_OK)


@require_http_methods(["GET"])
def get_weight_graph(request):
    breed_type = request.GET.get('breed_type') or ""
    breed_ids = breed_type.split(',') or []

    flock_id = request.GET.get('flock') or 0

    output = io.BytesIO()

    start_week = request.GET.get('start_week') or 0
    start_week = int(start_week)
    end_week = request.GET.get('end_week') or 10
    end_week = int(end_week)

    # Horizontal x data
    x_pos = np.array([*range(start_week, end_week + 1)])
    # x = np.array([i * len(breed_ids) for i in x_pos])
    x = np.arange(len(x_pos))
    width = 0.25

    fig, ax = plt.subplots(figsize=(20, 10))

    # For Flock Weights
    if (flock_id != 0):
        try:
            flock = models.Flock.objects.get(pk=flock_id)
            flock_color = flock.breed_type.color if flock.breed_type != None else '#4472C4'
            # Weights per week
            week_weights = []
            week_erros = []
            for w in x_pos:
                current_week_weights = []
                weights = models.Weight.objects.all().filter(chicken__flock=flock_id, week=w)
                for row in weights.iterator():
                    current_week_weights.append(Decimal(row.weight))
                avg = np.average(current_week_weights)
                std = np.std(current_week_weights)

                week_weights.append(avg)
                week_erros.append(std)
            rec = ax.bar(x_pos, week_weights, yerr=week_erros, align='center',
                         alpha=1, color=flock_color, capsize=10, zorder=3)
        except Exception as ex:
            print(ex)

    elif len(breed_ids) != 0:
        for breed_id in breed_ids:
            try:
                breed = models.BreedType.objects.get(pk=breed_id)
                breed_color = breed.color if breed.color != None else '#4472C4'
                # Weights per week
                week_weights = []
                week_erros = []
                for w in x_pos:
                    current_week_weights = []
                    weights = models.Weight.objects.all().filter(
                        chicken__breed_type=breed_id, week=w)
                    for row in weights.iterator():
                        current_week_weights.append(Decimal(row.weight))
                    avg = np.average(current_week_weights)
                    std = np.std(current_week_weights)

                    week_weights.append(avg)
                    week_erros.append(std)
                frm = [i + width for i in x]
                print(frm)
                rec = ax.bar(frm, week_weights, width=width, yerr=week_erros, align='center',
                             label=breed.name, color=breed_color, capsize=10, zorder=3)
                ax.bar_label(rec, padding=10)
                x = frm
            except Exception as ex:
                print(ex)

    ax.legend(loc='best')
    ax.set_ylabel('Weight', fontsize=15)
    ax.set_xlabel('Week', fontsize=15)
    ax.tick_params(axis='x', which='major', labelsize=15, length=10)
    ax.tick_params(axis='y', which='major', labelsize=15)
    ax.set_xticks([r + width + len(breed_ids) * width * 0.25
                   for r in range(len(x_pos))], x_pos)
    ax.set_xticklabels(x_pos)
    ax.set_title('Growth Perfomance')
    ax.yaxis.grid(True)
    fig.tight_layout()

    fig.savefig(output, format='png')

    output.seek(0)

    response = HttpResponse(
        output,
        content_type='image/png'
    )

    return response
