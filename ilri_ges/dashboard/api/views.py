from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.views import APIView
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import io
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse


from users.models import User
from flocks.models import Flock
from farms.models import Farm
from chickens.models import Chicken
from eggs.models import Egg
from weights.models import Weight
from farms.api.serializers import FarmSerializer_GET_V1


class StaticsviewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer_GET_V1

    def list(self, request, *args, **kwargs):
        farms = Farm.objects.all()
        users = User.objects.filter(is_superuser=False)
        flocks = Flock.objects.all()
        chickens = Chicken.objects.all()

        farms_ids = request.GET.get('farms', "") or ""

        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)

            farms = farms.filter(id__in=farms_ids)
            users = users.filter(farms__in=farms_ids)
            flocks = flocks.filter(farm__in=farms_ids)
            chickens = chickens.filter(farm__in=farms_ids)
        elif request.user.is_superuser != True:
            farms_ids = request.user.farms.all()

            farms = farms.filter(id__in=farms_ids)
            users = users.filter(farms__in=farms_ids)
            flocks = flocks.filter(farm__in=farms_ids)
            chickens = chickens.filter(farm__in=farms_ids)

        context = {
            'statics_count': {
                'users_count': users.count(),
                'flocks_count': flocks.count(),
                'farms_count': farms.count(),
                'chicken_count': chickens.count(),
            },
        }
        return Response(context)


# Analysis
@require_http_methods(["GET"])
def analysis_weight(request):
    start_week = request.GET.get('start_week') or 0
    end_week = request.GET.get('end_week') or 10

    plot_weeks = []
    plot_weights = []

    output = io.BytesIO()

    weights = Weight.objects.all()

    df = pd.DataFrame(list(weights.values('week', 'chicken_id', 'weight')))

    print(df.head())

    np.random.seed(1)

    N = 100
    x = np.random.rand(N)
    y = np.random.rand(N)
    colors = np.random.rand(N)
    sz = np.random.rand(N) * 30

    print(df['week'].values)
    print(df['week'].max())

    # fig = px.scatter(df['week'].values, y=df['weight'].values)
    fig = px.scatter(x=df['week'].values, y=df['weight'].values)

    # for week in range(start_week, end_week + 1):
    #     df_week = pd.DataFrame({
    #         'w'
    #     })
    #     weights = self.queryset.filter(week=week)
    #     weights_list = weights.values_list('weight')
    #     p_w = []

    # fig.write_image("images/fig1.png")
    img_bytes = fig.to_image(format="png")
    output.write(img_bytes)

    output.seek(0)

    response = HttpResponse(
        output,
        content_type='image/png'
    )

    return response
