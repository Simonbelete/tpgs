from django.shortcuts import render
from rest_framework import viewsets, mixins
from django.conf import settings
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.db import connection
from drf_spectacular.utils import extend_schema, OpenApiParameter
from django.db.models import F

from core.views import (
    HistoryViewSet,
    SummaryViewSet,
    CoreModelViewSet,
    GenericExportView,
    GenericImportView
)
from core.pagination import AllPagination
from . import models
from . import serializers
from . import admin
from . import filters
from feeds.models import Feed
from weights.models import Weight
from eggs.models import Egg
from chickens.models import Chicken


class ChickenViewSet(CoreModelViewSet):
    queryset = models.Chicken.all.all()
    serializer_class = serializers.ChickenSerializer_GET
    filterset_class = filters.ChickenFilter
    search_fields = ['tag']
    ordering_fields = '__all__'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH']:
            return serializers.ChickenSerializer_POST
        return serializers.ChickenSerializer_GET


class ChickenHistoryViewSet(HistoryViewSet):
    queryset = models.Chicken.history.all()
    serializer_class = serializers.ChickenHistorySerializer


class ChickenSummaryViewSet(SummaryViewSet):
    def get_query(self):
        return models.Chicken.all.get(pk=self.id_pk)


class ChickenExport(GenericExportView):
    queryset = models.Chicken.objects.all()
    filterset_class = filters.ChickenExportFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.ChickenResource().export(qs.qs)


class ChickenImport(GenericImportView):
    def get_resource(self):
        return admin.ChickenResource()


class ChickenWeightExport(GenericExportView):
    queryset = models.Chicken.objects.all()
    filterset_class = filters.ChickenExportFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.ChickenWeightResource().export(qs.qs)

class ChickenGetByTagViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChickenSerializer_GET

    def list(self, request, tag=None, **kwargs):
        tag = self.kwargs['tag']
        
        try:
            queryset = models.Chicken.all.get(tag=tag)
            serializer = self.get_serializer(queryset, many=False)
            return Response(serializer.data)
        except models.Chicken.DoesNotExist as ex:
            raise NotFound()


class ChickenEggExport(GenericExportView):
    queryset = models.Chicken.objects.all()
    filterset_class = filters.ChickenExportFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.ChickenEggResource().export(qs.qs)


class ChickenFeedExport(GenericExportView):
    queryset = models.Chicken.objects.all()
    filterset_class = filters.ChickenExportFilter

    def get_dataset(self):
        qs = self.filterset_class(self.request.GET, queryset=self.queryset)
        return admin.ChickenFeedResource().export(qs.qs)


class ChickenOffspringViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChickenSerializer_GET
    
    def list(self, request, id=None, **kwargs):
        id = self.kwargs['id']

        queryset = models.Chicken.all.get(pk=id).offspring()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ChickenAncestorViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChickenSerializer_GET

    def list(self, request, id=None, **kwargs):
        id = self.kwargs['id']

        queryset = list(models.Chicken.all.get(pk=id).ancestors())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class SiblingsViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.ChickenSerializer_GET

    def get_queryset(self):
        try:
            queryset = models.Chicken.all.get(pk=self.kwargs['id'])
            return queryset
        except models.Chicken.DoesNotExist as ex:
            raise NotFound()

    def list(self, request, id=None, **kwargs):
        id = self.kwargs['id']

        chicken = self.get_queryset()
        queryset = []
        if (chicken.sire and chicken.dam):
            queryset = models.Chicken.objects.exclude(
                pk=chicken.id).filter(sire=chicken.sire, dam=chicken.dam)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# unique
class ChickenUniqueViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    serializer_class = serializers.ChickenUniqueSerializer_GET
    @extend_schema(
        parameters=[OpenApiParameter(
        name='field',
        description='field name',
        location=OpenApiParameter.QUERY,
        required=True,
        type=str),]
    )
    def list(self, request, *args, **kwargs):
        field_name = request.GET.get('field')
        queryset = models.Chicken.all.order_by(field_name).distinct(field_name).values(field_name).annotate(id=F(str(field_name)))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ChickenGridViewSet(viewsets.ViewSet):
    def get_chicken(self, id):
        try:
            self.farm = Chicken.all.get(pk=id)
            return self.farm
        except Chicken.DoesNotExist:
            raise NotFound("Not found")

    def get_chicken_grid(self, id=None):
        try:
            # TODO: using chicken recordset model
            cursor = connection.cursor()
            cursor.execute("""
                SELECT ww.week, ff.week, ee.week,
                    ww.id AS body_weight_id, ww.weight AS body_weight,
                    ee.id AS egg_id, ee.eggs AS eggs, ee.weight AS eggs_weight,
                    ff.id AS feed_id, ff.weight AS feed_weight
                FROM ( SELECT * FROM weights_weight ww WHERE ww.chicken_id = {chicken_id} ) ww
                FULL JOIN (SELECT * FROM eggs_egg ee WHERE ee.chicken_id={chicken_id}) ee
                    ON ee.week = ww.week
                FULL JOIN (SELECT * FROM feeds_feed ff WHERE ff.chicken_id={chicken_id}) ff
                    ON ff.week = ww.week
                WHERE ff.parent_id IS NULL
                order by ww.week, ff.week, ee.week
            """.format(chicken_id=id))

            columns = ['ww.week', 'ff.week', 'ee.week', 'body_weight_id', 'body_weight', 'egg_id',
                       'eggs', 'eggs_weight', 'feed_id', 'feed_weight']

            result = []
            for row in cursor.fetchall():
                zipper = [('week', None)]
                for i in range(len(columns)):
                    if (columns[i] in ['ww.week', 'ff.week', 'ee.week']):
                        # zipper.append(('week', row[i]))
                        a = row[i] if zipper[0][1] is None else zipper[0][1]
                        zipper[0] = ('week', a)
                        # zipper.append(('week', a))
                    else:
                        zipper.append((columns[i], row[i]))
                result.append(dict(zipper))

            return result
        except Exception as ex:
            return []

    def list(self, request, id=None):
        try:
            result = self.get_chicken_grid(id)
            return Response({
                'results': result
            }, status=200)
        except Exception as ex:
            return Response({}, status=500)

    def create(self, request, id=None):
        try:
            data = request.data['data']
            chicken = self.get_chicken(id)
            for i in data:
                if(i['body_weight'] != 0 and i['body_weight'] != None):
                    Weight.objects.update_or_create(chicken=chicken, week=i['week'], defaults={
                                                'weight': i['body_weight']})
                if((i['eggs_weight'] !=0 and i['eggs_weight'] != None) and (i['eggs'] !=0 and i['eggs'] != None)):
                    print('found')
                    Egg.objects.update_or_create(chicken=chicken, week=i['week'], defaults={
                                             'eggs': i['eggs'], 'weight': i['eggs_weight']})
                if(i['feed_weight'] != 0 and i['feed_weight'] != None):
                    Feed.objects.update_or_create(chicken=chicken, week=i['week'], defaults={
                                              'weight': i['feed_weight']})

            return Response({
                'results': self.get_chicken_grid(id)
            }, status=201)
        except Exception as ex:
            print(ex)
            return Response({'error': str(ex)}, status=500)

    def delete(self, request, id=None):
        try:
            data = request.data
            print(data)
            if (data['feed_id']):
                Feed.objects.get(pk=data['feed_id']).delete()

            if (data['egg_id']):
                Egg.objects.get(pk=data['egg_id']).delete()

            if (data['body_weight_id']):
                Weight.objects.get(pk=data['body_weight_id']).delete()

            return Response({}, status=204)
        except Exception as ex:
            print(ex)
            return Response({'error': str(ex)}, status=500)
