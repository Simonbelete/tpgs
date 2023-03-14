import io
import numpy as np
from decimal import Decimal
from rest_framework import viewsets, status
from django_filters import rest_framework as filters
from rest_framework.response import Response
from django.views.decorators.http import require_http_methods
import matplotlib.pyplot as plt
from django.views.decorators.http import require_http_methods
from django_filters import rest_framework as filters
from django.http import HttpResponse

from . import serializers
from core.views import HistoryViewSet
from .. import models
from breeds.models import BreedType
from weights.models import Weight
from flocks.models import Flock


class WeightFilter(filters.FilterSet):
    start_week = filters.CharFilter(field_name='week', lookup_expr='gte')
    end_week = filters.CharFilter(field_name='week', lookup_expr='lte')
    chicken = filters.CharFilter(field_name='chicken', lookup_expr='exact')

    class Meta:
        model = models.Weight
        fields = ['start_week', 'end_week', 'chicken']


class WeightViewSet(viewsets.ModelViewSet):
    queryset = models.Weight.objects.all()
    serializer_class = serializers.WeightSerializer_GET_V1
    filterset_class = WeightFilter
    search_fields = ['chicken__tag']
    ordering_fields = '__all__'


class WeightHistoryViewSet(HistoryViewSet):
    queryset = models.Weight.history.all()
    serializer_class = serializers.WeightHistory


@require_http_methods(["GET"])
def get_weight_graph(request):
    breed_type = request.GET.get('breed_type') or ""
    breed_ids = breed_type.split(',') or []

    flock_id = request.GET.get('flock') or 0

    output = io.BytesIO()

    start_week = request.GET.get('start_week') or 0
    start_week = int(start_week)
    end_week = request.GET.get('end_week') or 10
    end_week = int(end_week)

    # Horizontal x data
    x_pos = np.array([*range(start_week, end_week + 1)])
    # x = np.array([i * len(breed_ids) for i in x_pos])
    x = np.arange(len(x_pos))
    width = 0.25

    fig, ax = plt.subplots(figsize=(20, 10))

    # For Flock Weights
    if (flock_id != 0):
        try:
            flock = Flock.objects.get(pk=flock_id)
            flock_color = flock.breed_type.color if flock.breed_type != None else '#4472C4'
            # Weights per week
            week_weights = []
            week_erros = []
            for w in x_pos:
                current_week_weights = []
                weights = Weight.objects.all().filter(chicken__flock=flock_id, week=w)
                for row in weights.iterator():
                    current_week_weights.append(Decimal(row.weight))
                avg = np.average(current_week_weights)
                std = np.std(current_week_weights)

                week_weights.append(avg)
                week_erros.append(std)
            rec = ax.bar(x_pos, week_weights, yerr=week_erros, align='center',
                         alpha=1, color=flock_color, capsize=10, zorder=3)
        except Exception as ex:
            print(ex)

    elif len(breed_ids) != 0:
        for breed_id in breed_ids:
            try:
                breed = BreedType.objects.get(pk=breed_id)
                breed_color = breed.color if breed.color != None else '#4472C4'
                # Weights per week
                week_weights = []
                week_erros = []
                for w in x_pos:
                    current_week_weights = []
                    weights = Weight.objects.all().filter(
                        chicken__breed_type=breed_id, week=w)
                    for row in weights.iterator():
                        current_week_weights.append(Decimal(row.weight))
                    avg = np.average(current_week_weights)
                    std = np.std(current_week_weights)

                    week_weights.append(avg)
                    week_erros.append(std)
                frm = [i + width for i in x]
                print(frm)
                rec = ax.bar(frm, week_weights, width=width, yerr=week_erros, align='center',
                             label=breed.name, color=breed_color, capsize=10, zorder=3)
                ax.bar_label(rec, padding=10)
                x = frm
            except Exception as ex:
                print(ex)

    ax.legend(loc='best')
    ax.set_ylabel('Weight', fontsize=15)
    ax.set_xlabel('Week', fontsize=15)
    ax.tick_params(axis='x', which='major', labelsize=15, length=10)
    ax.tick_params(axis='y', which='major', labelsize=15)
    ax.set_xticks([r + width + len(breed_ids) * width * 0.25
                   for r in range(len(x_pos))], x_pos)
    ax.set_xticklabels(x_pos)
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
