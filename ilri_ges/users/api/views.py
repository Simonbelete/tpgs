from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth.models import Group
from django_filters import rest_framework as filters

from users.models import User
from users.api.serializers import UserSerializer_GET_V1, GroupSerializer_GET_V1
from core.views import ModelFilterViewSet


class UserFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')

    class Meta:
        model = User
        fields = ['name', 'email', 'groups', 'is_active', 'farms']


class UserViewSet(ModelFilterViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer_GET_V1
    filterset_class = UserFilter
    search_fields = ['name', 'email']
    ordering_fields = '__all__'
    fi = {'ab': 'b'}

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     serializer = self.get_serializer(queryset, many=True)

    #     return Response({'count': 10, 'result': serializer.data, 'searchPanes': {'options': {
    #         "email": [
    #             {
    #                 "label": "email 1",
    #                 # "total": 10,
    #                 "value": "email 1",
    #                 "count": 1
    #             }
    #         ]
    #     }}})

    def filters(self):
        queryset = self.filter_queryset(self.get_queryset())
        email_filters = queryset.values_list('email').distinct()
        print('-------------------')
        print(email_filters)
        return {
            'email': {
                'label': 'Email',
                'value': 'b'
            }
        }

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['filters'] = self.filters()
            return response

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer_GET_V1
