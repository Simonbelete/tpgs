from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist


class HistoryViewSet(viewsets.ModelViewSet):
    class Meta:
        pass

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(id=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ModelFilterViewSet(viewsets.ModelViewSet):
    def filters(self):
        raise NotImplementedError(
            self.__class__.__name__ + 'add filters class')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['searchPanes'] = {"options": self.filters()}
            return response

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SummaryViewSet(viewsets.ViewSet):
    def get_query(self):
        return NotImplementedError('Queryset must be implement')

    def get_queryset(self):
        try:
            queryset = self.get_query()
            return queryset
        except ObjectDoesNotExist as ex:
            raise NotFound()

    def list(self, request, id_pk=None, **kwargs):
        try:
            self.id_pk = id_pk
            self.queryset = self.get_queryset()
            history_queryset = self.queryset.history.most_recent()
            return Response({
                'created_by': self.queryset.created_by or 'unknown',
                'created_at': self.queryset.created_at,
                'last_updated_by': history_queryset.history_user,
                'last_updated_at': history_queryset.history_date,
                'last_history_id': history_queryset.history_id,
                'last_history_type': history_queryset.history_type
                'history_count': 0
            }, status=200)
        except ObjectDoesNotExist as ex:
            # No History found
            return Response({
                'created_by': self.queryset.created_by or 'unknown',
                'created_at': self.queryset.created_at,
                'last_updated_by': None,
                'last_updated_at': None,
                'last_history_id': None,
                'last_history_type': None,
                'history_count': 0
            }, status=200)