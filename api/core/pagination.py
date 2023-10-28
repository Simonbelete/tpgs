from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination, BasePagination
from rest_framework.response import Response
from collections import OrderedDict

class LimitPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'limit'

class AllPagination(BasePagination):    
    def paginate_queryset(self, queryset, request, view=None):  # pragma: no cover
        self.count = self.get_count(queryset)
        return queryset

    def get_count(self, queryset):
        """
        Determine an object count, supporting either querysets or regular lists.
        """
        try:
            return queryset.count()
        except (AttributeError, TypeError):
            return len(queryset)

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.count),
            ('results', data)
        ]))