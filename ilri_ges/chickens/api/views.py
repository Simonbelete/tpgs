from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework.views import APIView

from chickens.models import Chicken
from chickens.api.serializers import ChickenSerializer_GET_V1
from weights.models import Weight
from feeds.models import Feed


class ChickenFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='contains')
    farm = filters.CharFilter(field_name='farm', lookup_expr='exact')
    flock = filters.CharFilter(field_name='flock', lookup_expr='exact')
    breed_type = filters.CharFilter(
        field_name='breed_type', lookup_expr='exact')
    sex = filters.CharFilter(field_name='sex', lookup_expr='contains')

    class Meta:
        model = Chicken
        fields = ['tag', 'farm', 'flock', 'sex', 'breed_type']


class ChickenViewSet(viewsets.ModelViewSet):
    queryset = Chicken.objects.all()
    serializer_class = ChickenSerializer_GET_V1
    filterset_class = ChickenFilter
    search_fields = ['tag']
    ordering_fields = '__all__'

# Feed Conversion ration - Growth


class FCrGrowth(APIView):
    queryset = Chicken.objects.all()

    def get(self, request, id=0):
        start_week = request.GET.get('start_week') or 0
        end_week = request.GET.get('end_week') or 0

        start_week = int(start_week)
        end_week = int(end_week)

        if id == 0 or end_week == 0:
            return Response({'results': [], 'error': ['Please provide valid data for start_week',
                                                      'Please provide valid data for end_week',
                                                      'Please provide valid data for id']}, status=status.HTTP_400_BAD_REQUEST)

        fcrs = []
        for current_week in range(start_week, end_week + 1):
            current_week_fcr = {'week': current_week}
            fcr = 0
            current_week_weight = 0
            previous_week_weight = 0
            weight_gain = 0
            feed_weight = 0
            try:
                feed = Feed.objects.get(chicken=id, week=current_week)
                current_week_weight = Weight.objects.get(
                    chicken=id, week=current_week)
                previous_week_weight = Weight.objects.get(
                    chicken=id, week=current_week - 1)

                feed_weight = feed.weight
                current_week_weight = current_week_weight.weight
                previous_week_weight = previous_week_weight.weight

                weight_gain = current_week_weight - previous_week_weight
                fcr = feed_weight/weight_gain
            except:
                fcr = 0
            current_week_fcr['fcr'] = fcr
            current_week_fcr['current_week_weight'] = current_week_weight
            current_week_fcr['previous_week_weight'] = previous_week_weight
            current_week_fcr['weight_gain'] = weight_gain
            current_week_fcr['feed_weight'] = feed_weight
            fcrs.append(current_week_fcr)

        return Response({'results': fcrs, 'count': len(fcrs)}, status=status.HTTP_200_OK)
