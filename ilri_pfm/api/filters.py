from rest_framework.filters import BaseFilterBackend


class IsActiveFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(is_active=True)


class HaveFarmFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(farm__in=request.user.farms)
