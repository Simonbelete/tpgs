from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters import rest_framework as filters

import api.models as models
from api.v1 import serializers

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
    search_fields = ['name', 'city']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.FarmSerializer_GET_V1
        return serializers.FarmSerializer_POST_V1


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
    filterset_class = StageFilter
    search_fields = ['name']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.LayedPlaceSerializer_GET_V1
        return serializers.LayedPlaceSerializer_POST_V1


############################ Chicken ############################

class ChickenFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.Chicken
        fields = ['tag']


class ChickenViewSet(viewsets.ModelViewSet):
    queryset = models.Chicken.objects.all()
    serializer_class = serializers.ChickenSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = ChickenFilter
    search_fields = ['tag']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.ChickenSerializer_GET_V1
        return serializers.ChickenSerializer_POST_V1


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


############################ Weight ############################

class WeightFilter(filters.FilterSet):

    class Meta:
        model = models.Weight
        fields = ''


class WeightViewSet(viewsets.ModelViewSet):
    queryset = models.Weight.objects.all()
    serializer_class = serializers.WeightSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = WeightFilter
    search_fields = ['date']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.WeightSerializer_GET_V1
        return serializers.WeightSerializer_POST_V1


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

class BreedTypeFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = models.FeedType
        fields = ['name']


class FeedTypeViewSet(viewsets.ModelViewSet):
    queryset = models.FeedType.objects.all()
    serializer_class = serializers.FeedTypeSerializer_GET_V1
    filter_backends = (filters.DjangoFilterBackend,
                       SearchFilter, OrderingFilter)
    filterset_class = BreedTypeFilter
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
    search_fields = ['date']
    ordering_fields = '__all__'

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.FeedSerializer_GET_V1
        return serializers.FeedSerializer_POST_V1
