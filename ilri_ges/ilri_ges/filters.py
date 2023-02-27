from rest_framework.filters import BaseFilterBackend


class IsActiveFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(is_active=True)


class HaveFarmFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if request.user.is_superuser:
            return queryset
        else:
            farms = request.user.farms if request.user.farms.exists() else []
            return queryset.filter(farm__in=farms, farms__in=farms)
