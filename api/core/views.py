from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from datetime import date
from django.conf import settings


class CoreModelViewSet(viewsets.ModelViewSet):
    # def get_queryset(self):
    #     is_active = self.request.GET.get('is_active')
    #     print('-------------')
    #     print(is_active)
    #     if (not is_active or distutils.util.strtobool(is_active)):
    #         return self.queryset
    #     return self.all_queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


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
            history_queryset = self.queryset.history.last()
            if (not history_queryset):
                raise ObjectDoesNotExist()
            return Response({
                'created_by': {
                    'id': self.queryset.created_by.id if self.queryset.created_by else 0,
                    'name': self.queryset.created_by.name if self.queryset.created_by else 'unknown'
                },
                'created_at': self.queryset.created_at,
                'last_updated_by': {
                    'id': history_queryset.history_user.id,
                    'name': history_queryset.history_user.name
                },
                'last_updated_at': history_queryset.history_date,
                'last_history_id': history_queryset.history_id,
                'last_history_type': history_queryset.history_type,
                'history_count': self.queryset.history.count()
            }, status=200)
        except ObjectDoesNotExist as ex:
            # No History found
            return Response({
                'created_by': {
                    'id': 0,
                    'name': self.queryset.created_by or 'unknown',
                },
                'created_at': self.queryset.created_at,
                'last_updated_by': 'unknown',
                'last_updated_at': None,
                'last_history_id': None,
                'last_history_type': None,
                'history_count': 0
            }, status=200)


class XlsxExport(APIView):
    def get_dataset(self):
        raise NotImplemented()

    def get(self, request):
        dataset = self.get_dataset()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response
