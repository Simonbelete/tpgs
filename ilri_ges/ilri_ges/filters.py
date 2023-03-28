from rest_framework.filters import BaseFilterBackend
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response
from collections import OrderedDict


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
        else:
            farms = request.user.farms.all() if request.user.farms.all().exists() else []
            # return queryset.filter(farm__in=farms, farms__in=farms)
            filtered_queryset = queryset
            try:
                filtered_queryset = queryset.filter(
                    farms__in=farms)
            except:
                filtered_queryset = queryset.filter(
                    farm__in=farms)
            return filtered_queryset


class LimitPageNumberPagination(LimitOffsetPagination):
    page_size_query_param = 'limit'
