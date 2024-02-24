from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from datetime import date
from django.conf import settings
from rest_framework.parsers import MultiPartParser
from tablib import Dataset
from import_export import resources
import pandas as pd
from rest_framework.renderers import TemplateHTMLRenderer
from django_tenants.utils import schema_context
from django_tenants.utils import tenant_context
from farms.models import Farm

from core.serializers import UploadSerializer


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
                    'id': history_queryset.history_user.id if history_queryset.history_user else 0,
                    'name': history_queryset.history_user.name if history_queryset.history_user else 'unknown',
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


# Exports
class GenericExportView(APIView):
    def get_dataset(self):
        raise NotImplemented()

    def export_xlsx(self):
        dataset = self.get_dataset()
        response = HttpResponse(
            dataset.xlsx, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_%s.xlsx"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

    def export_xls(self):
        dataset = self.get_dataset()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

    def export_csv(self):
        dataset = self.get_dataset()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

    def get(self, request, export_type=None):
        # export_type = self.kwargs['export_type']
        if (export_type == 'xlsx'):
            return self.export_xlsx()
        elif (export_type == 'xls'):
            return self.export_xls()
        elif (export_type == 'csv'):
            return self.export_csv()
        else:
            return Response({'error': ['export type']})


class GenericImportView(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'import_result.html'

    def after_read_file(self, df):
        return df

    def after_imported(self):
        pass

    def get_resource(self):
        raise NotImplemented()

    def import_xlsx(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        df = self.after_read_file(df)
        dataset = Dataset().load(df)
        resource = self.get_resource()
        result = resource.import_data(dataset, dry_run=True)
        if not result.has_errors():
            result = resource.import_data(dataset, dry_run=False)
            self.after_imported()
        return Response({'result': result})

    def import_xls(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        df = self.after_read_file(df)
        dataset = Dataset().load(df)
        resource = self.get_resource()
        result = resource.import_data(dataset, dry_run=True)
        if not result.has_errors():
            result = resource.import_data(dataset, dry_run=False)
            self.after_imported()
        return Response({'result': result})

    def import_csv(self, request):
        with tenant_context(Farm.objects.get(name="test")):
            file = request.FILES.get('file')
            df = pd.read_csv(file, header=0)
            df = self.after_read_file(df)
            dataset = Dataset().load(df)
            resource = self.get_resource()
            result = resource.import_data(dataset, dry_run=True)
            if not result.has_errors():
                result = resource.import_data(dataset, dry_run=False)
                self.after_imported()
            return Response({'result': result})

    def post(self, request, import_type=None):
        if (import_type == 'xlsx'):
            return self.import_xlsx(request)
        elif (import_type == 'xls'):
            return self.import_xls(request)
        elif (import_type == 'csv'):
            return self.import_csv(request)
        else:
            return Response({'error': ['import type']})


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


class XlsExport(APIView):
    def get_dataset(self):
        raise NotImplemented()

    def get(self, request):
        dataset = self.get_dataset()
        response = HttpResponse(
            dataset.xls, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="export_%s.xls"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response


class CsvExport(APIView):
    def get_dataset(self):
        raise NotImplemented()

    def get(self, request):
        dataset = self.get_dataset()
        response = HttpResponse(
            dataset.csv, content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="houses%s.csv"' % (
            date.today().strftime(settings.DATETIME_FORMAT))
        return response

# Imports


class XlsxImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'import_result.html'

    def get_resource(self):
        raise NotImplemented()

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = self.get_resource()
        result = resource.import_data(dataset, dry_run=True)
        if not result.has_errors():
            result = resource.import_data(dataset, dry_run=False)
        return Response({'result': result})


class XlsImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'import_result.html'

    def get_resource(self):
        raise NotImplemented()

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_excel(file, header=0)
        dataset = Dataset().load(df)
        resource = self.get_resource()
        result = resource.import_data(dataset, dry_run=True)
        if not result.has_errors():
            result = resource.import_data(dataset, dry_run=False)
        return Response({'result': result})


class CsvImport(APIView):
    serializer_class = UploadSerializer
    parser_classes = [MultiPartParser]
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'import_result.html'

    def get_resource(self):
        raise NotImplemented()

    def post(self, request):
        file = request.FILES.get('file')
        df = pd.read_csv(file, header=0)
        dataset = Dataset().load(df)
        resource = self.get_resource()
        result = resource.import_data(dataset, dry_run=True)
        if not result.has_errors():
            result = resource.import_data(dataset, dry_run=False)
        return Response({'result': result})
