from rest_framework.filters import BaseFilterBackend
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response
from collections import OrderedDict

from chickens.models import Chicken
from eggs.models import Egg
from farms.models import Farm
from feeds.models import Feed
from flocks.models import Flock
from users.models import User
from weights.models import Weight


class IsActiveFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if (request.GET.get('is_active') != False):
            return queryset.filter(is_active=True)
        else:
            return queryset


class HaveFarmFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if (request.user == None):
            return queryset

        if request.user.is_superuser:
            return queryset

        farms = request.user.farms.all() if request.user.farms.all().exists() else []
        filtered_queryset = queryset

        if Farm.__name__ == queryset.model.__name__:
            filtered_queryset = queryset.filter(id__in=farms)
        elif User.__name__ == queryset.model.__name__:
            filtered_queryset = queryset.filter(
                farms__in=farms)
        elif queryset.model.__name__ in [Chicken.__name__, Flock.__name__]:
            filtered_queryset = queryset.filter(
                farm__in=farms)
        elif queryset.model.__name__ in [Egg.__name__, Feed.__name__, Weight.__name__]:
            filtered_queryset = queryset.filter(
                chicken__farm__in=farms)
        return filtered_queryset


class LimitPageNumberPagination(LimitOffsetPagination):
    page_size_query_param = 'limit'
