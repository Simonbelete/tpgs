from rest_framework.filters import BaseFilterBackend

class FarmFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):