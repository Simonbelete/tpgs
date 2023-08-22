from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

class LimitPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'limit'
