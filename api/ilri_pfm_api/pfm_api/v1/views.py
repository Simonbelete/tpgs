import io
import csv
import xlsxwriter
import numpy as np
from decimal import Decimal
import matplotlib.pyplot as plt
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404, HttpResponse
from django.db.models import Count
from rest_framework import generics
from django_filters import rest_framework as filters

from pfm_api.v1.serializers import UserSerializer, DeviceSerializer, FarmSerializer, ChickenParentSerializer, ChickenStageSerializer, EggSerializer, LayedPlaceSerializer, BreedTypeSerializer, ChickenGrowthSerializer
import pfm_api.v1.serializers as V1Serializer
from pfm_api.models import Device, Farm, Chicken, ChickenParent, BreedType, ChickenStage, Egg, LayedPlace, ChickenGrowth
import pfm_api.models as Model

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUidViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        try:
            instance = self.queryset.get(uid=pk)
            return Response(self.serializer_class(instance).data,
                            status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()

class UserAllCountViewSet(viewsets.ModelViewSet):
    queryset = Model.User.objects.all()
    serializer_class = V1Serializer.UserCountSerializer
    pagination_class = None
    
    def list(self, request, *args, **kwargs):
        try:
            instance = Model.User.objects.count()
            return Response({
                'count': instance,
                'results': {'count': instance}},
                            status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class FarmFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name',lookup_expr='contains')

    class Meta:
        model = Model.Farm
        fields = ['name']

class FarmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = FarmFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

## Chicken View Set

class ChickenFilter(filters.FilterSet):
    tag = filters.CharFilter(field_name='tag',lookup_expr='contains')

    class Meta:
        model = Chicken
        fields = ['tag']

class ChickenViewSet(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    serializer_class = V1Serializer.ChickenSerializer_GET
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ChickenFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return V1Serializer.ChickenSerializer_GET
        return V1Serializer.ChickenSerializer_POST

class AllChickenGrowthViewSet(viewsets.ModelViewSet):
    queryset = ChickenGrowth.objects.all()
    serializer_class = ChickenGrowthSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        try:
            chicken_pk = self.kwargs['chicken_pk']
            instance = self.get_queryset().filter(chicken=chicken_pk)
            return Response({
                'count': len(instance),
                'results': self.serializer_class(instance, many=True).data},
                            status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()

    # def get_queryset(self):
    #     chicken_pk = self.kwargs['chicken_pk']
    #     return self.queryset.filter(chicken=chicken_pk)

class ChickenGrowthViewSet(viewsets.ModelViewSet):
    queryset = ChickenGrowth.objects.all()
    serializer_class = ChickenGrowthSerializer

class ChickenParentViewSet(viewsets.ModelViewSet):
    queryset = ChickenParent.objects.all()
    serializer_class = ChickenParentSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class BreedTypeParentViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.all()
    serializer_class = BreedTypeSerializer

    def perform_create(self, serializer):
  
        serializer.save(created_by=self.request.user)

class BreedTypeChickenPercentageViewSet(viewsets.ModelViewSet):
    queryset = BreedType.objects.annotate(chicken_count = Count('chicken'))
    serializer_class = V1Serializer.BreedTypeReportPercentageSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        try:
            instance = self.get_queryset()
            return Response({
                'count': len(instance),
                'chicken_count': Chicken.objects.count(),
                'results': V1Serializer.BreedTypeReportPercentageSerializer(instance, many=True).data},
                            status=status.HTTP_200_OK)
        except self.queryset.model.DoesNotExist:
            raise Http404()

class ChickenStageFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name',lookup_expr='contains')

    class Meta:
        model = Model.ChickenStage
        fields = ['name']

class ChickenStageViewSet(viewsets.ModelViewSet):
    queryset = ChickenStage.objects.all()
    serializer_class = ChickenStageSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ChickenStageFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class EggParentViewSet(viewsets.ModelViewSet):
    queryset = Egg.objects.all()
    serializer_class = EggSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class LayedPlaceViewSet(viewsets.ModelViewSet):
    queryset = LayedPlace.objects.all()
    serializer_class = LayedPlaceSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class EggViewSet(viewsets.ModelViewSet):
    queryset = Egg.objects.all()
    serializer_class = V1Serializer.EggSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class FeedTypeViewSet(viewsets.ModelViewSet):
    queryset = Model.FeedType.objects.all()
    serializer_class = V1Serializer.FeedType_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return V1Serializer.FeedType_GET
        return V1Serializer.FeedType_POST

class FeedViewSet(viewsets.ModelViewSet):
    queryset = Model.Feed.objects.all()
    serializer_class = V1Serializer.Feed_GET

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return V1Serializer.Feed_GET
        return V1Serializer.Feed_POST

# Exports
class WeightExport_CSV(viewsets.ModelViewSet):
    queryset = Model.ChickenGrowth.objects.all()
    serializer_class = V1Serializer.ExportChickenGrowthSerializer
    def list(self, request, *args, **kwargs):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="export.csv"'
        
        serializer = self.get_serializer(
            Model.ChickenGrowth.objects.all(),
            many=True
        )
        # header = V1Serializer.ExportChickenGrowthSerializer.Meta.fields
        
        writer = csv.DictWriter(response, fieldnames=('tag', 'week', 'date', 'weight'))
        writer.writeheader()
        for row in serializer.data:
            writer.writerow({
                'tag': row['chicken']['tag'], 
                'week': row['week'], 
                'date': row['date'], 
                'weight': row['weight']
                })
    
        return response

class WeightExport_XLSX(viewsets.ModelViewSet):
    queryset = Model.ChickenGrowth.objects.all()
    serializer_class = V1Serializer.ExportChickenGrowthSerializer
    def list(self, request, *args, **kwargs):
        # Create an in-memory output file for the new workbook.
        output = io.BytesIO()

        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()

        data = []
        worksheet.write(0, 0, 'hello')
        workbook.close()

        # Rewind the buffer.
        output.seek(0)

        filename = 'report.xlsx'
        response = HttpResponse(
            output,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response

class ReportWeight_IMG(viewsets.ModelViewSet):
    queryset = Model.ChickenGrowth.objects.all()
    serializer_class = V1Serializer.ReportWeightIMGSerializer
    def list(self, request, *args, **kwargs):
        output = io.BytesIO()

        x_data = []
        error = []

        start_week = 0
        end_week = 10
        weeks = []

        for week in range(start_week, end_week):
            weeks.append(str(week))
            serializer = self.get_serializer(
                Model.ChickenGrowth.objects.all().filter(week=week),
                many=True
            )
            weights = []
            for row in serializer.data:
                weights.append(Decimal(row['weight']))
   
            avg = np.average(weights)
            std = np.std(weights)
            x_data.append(avg)
            error.append(std)
            
        x_pos = np.arange(len(weeks))
        
        fig, ax = plt.subplots(figsize=(20,10))
        ax.bar(x_pos, x_data, yerr=error, align='center', alpha=0.5, ecolor='black', capsize=10)
        ax.set_ylabel('Weight', fontsize=15)
        ax.set_xlabel('Week', fontsize=15)
        ax.tick_params(axis='x', which='major', labelsize=15)
        ax.tick_params(axis='y', which='major', labelsize=15)
        ax.set_xticks(x_pos)
        ax.set_xticklabels(weeks)
        ax.set_title('Growth Perfomance')
        ax.yaxis.grid(True)
        fig.tight_layout()

        fig.savefig(output, format='png')
        
        output.seek(0)

        response = HttpResponse(
            output,
            content_type='image/png'
        )

        return response
