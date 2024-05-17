from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from django.http import HttpResponse
from datetime import date
from django.conf import settings
from rest_framework.parsers import MultiPartParser
from tablib import Dataset
from import_export import resources
import pandas as pd
from rest_framework.renderers import TemplateHTMLRenderer
from django_tenants.utils import tenant_context
from farms.models import Farm
import numpy as np
import warnings
from rest_framework import viewsets, mixins

from core.serializers import UploadSerializer


def get_content_type_for_model(obj):
    # Since this module gets imported in the application's root package,
    # it cannot import models from other applications at the module level.
    from django.contrib.contenttypes.models import ContentType

    return ContentType.objects.get_for_model(obj, for_concrete_model=False)


class CoreModelViewSet(viewsets.ModelViewSet):
    def _get_changed_field_from_objects(self, new_object, old_object):
        delta = new_object.diff_against(old_object)
        changed_field = []
        for change in delta.changes:
            changed_field.append(change.field)
            print(change)
            print("{} changed from {} to {}".format(
                change.field, change.old, change.new))
        return changed_field

    def log_addition(self, request, obj, message):
        """
        Log that an object has been successfully added.

        The default implementation creates an admin LogEntry object.
        """
        from django.contrib.admin.models import ADDITION, LogEntry

        return LogEntry.objects.log_action(
            user_id=request.user.pk,
            content_type_id=get_content_type_for_model(obj).pk,
            object_id=obj.pk,
            object_repr=str(obj),
            action_flag=ADDITION,
            change_message=message,
        )

    def log_change(self, request, obj, message):
        """
        Log that an object has been successfully changed.

        The default implementation creates an admin LogEntry object.
        """
        from django.contrib.admin.models import CHANGE, LogEntry

        return LogEntry.objects.log_action(
            user_id=request.user.pk,
            content_type_id=get_content_type_for_model(obj).pk,
            object_id=obj.pk,
            object_repr=str(obj),
            action_flag=CHANGE,
            change_message=message,
        )

    def log_deletion(self, request, obj, object_repr):
        """
        Log that an object will be deleted. Note that this method must be
        called before the deletion.

        The default implementation creates an admin LogEntry object.
        """
        from django.contrib.admin.models import DELETION, LogEntry

        return LogEntry.objects.log_action(
            user_id=request.user.pk,
            content_type_id=get_content_type_for_model(obj).pk,
            object_id=obj.pk,
            object_repr=object_repr,
            action_flag=DELETION,
        )

    def perform_create(self, serializer):
        new_object = serializer.save(created_by=self.request.user)

        change_message = [{
            "added": {
                "name": str(self.queryset.model.__name__),
                "object": str(new_object)
            }
        }]
        self.log_addition(self.request, new_object, change_message)

    def perform_update(self, serializer):
        new_object = serializer.save()

        new_record = new_object.history.first()
        old_record = new_record.prev_record

        change_message = [{
            "changed": {
                "name":  str(self.queryset.model.__name__),
                "object": str(new_record),
                "fields": self._get_changed_field_from_objects(new_record, old_record)
            }
        }]

        self.log_change(self.request, new_object, change_message)

    def perform_destroy(self, instance):
        deleted_object = instance.delete()
        change_message = [{
            "deleted": {
                "name":  str(self.queryset.model.__name__),
                "object": str(deleted_object),
            }
        }]
        self.log_deletion(self.request, deleted_object, change_message)


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


class SummaryViewSet(mixins.RetrieveModelMixin,
                     mixins.ListModelMixin,
                     viewsets.GenericViewSet):
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
        df = df.replace(np.nan, None)
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
        df = df.replace(np.nan, None)
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
            df = df.replace(np.nan, None)
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
