from rest_framework.filters import BaseFilterBackend
from rest_framework.pagination import PageNumberPagination


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
            farms = request.user.farms if request.user.farms.exists() else []
            return queryset.filter(farm__in=farms, farms__in=farms)


class LimitPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'limit'
