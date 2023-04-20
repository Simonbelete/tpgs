from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.views import APIView
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import io
from sklearn.ensemble import IsolationForest
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from json import loads, dumps
from sklearn.metrics import accuracy_score

from users.models import User
from flocks.models import Flock
from farms.models import Farm
from chickens.models import Chicken
from eggs.models import Egg
from feeds.models import Feed
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
class AnalysisWeight(APIView):
    queryset = Weight.objects.all()

    def get(self, request):
        farms_ids = request.GET.get('farms', "") or ""
        breed_types_ids = request.GET.get('breed_type', "") or ""
        sex = request.GET.get('sex', "") or ""

        weights = self.queryset

        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)
            weights = weights.filter(chicken__farm__in=farms_ids)

        if len(breed_types_ids) != 0:
            breed_types_ids = np.array(
                breed_types_ids.split(',') or []).astype(int)
            weights = weights.filter(chicken__breed_type__in=breed_types_ids)

        if len(sex) != 0:
            weights = weights.filter(chicken__sex=sex)

        if weights.exists() == False:
            return Response({'results': []})

        df = pd.DataFrame(
            list(weights.values('chicken__tag', 'chicken__sex', 'week', 'chicken_id', 'weight')))

        week_group = df.groupby('week')

        for name, group in week_group:
            isolation_model = IsolationForest(contamination=float(0.1))
            isolation_model.fit(group[['weight']].values)
            IF_predictions = isolation_model.predict(group[['weight']].values)
            group['anomalies'] = IF_predictions
            group['scores'] = isolation_model.decision_function(
                group[['weight']].values)

            df = pd.concat([df, group])

        df = df[df['anomalies'] == -1]
        df = df.sort_values(by=['scores'])

        parsed = loads(df.to_json(orient="records"))

        return Response({'results': parsed})


@require_http_methods(["GET"])
def analysis_weight_graph(request):
    farms_ids = request.GET.get('farms', "") or ""
    breed_types_ids = request.GET.get('breed_type', "") or ""
    sex = request.GET.get('sex', "") or ""

    output = io.BytesIO()

    weights = Weight.objects.all()

    if len(farms_ids) != 0:
        farms_ids = np.array(farms_ids.split(',') or []).astype(int)
        weights = weights.filter(chicken__farm__in=farms_ids)

    if len(breed_types_ids) != 0:
        breed_types_ids = np.array(
            breed_types_ids.split(',') or []).astype(int)
        weights = weights.filter(chicken__breed_type__in=breed_types_ids)

    if len(sex) != 0:
        weights = weights.filter(chicken__sex=sex)

    df = pd.DataFrame(list(weights.values('week', 'chicken_id', 'weight')))

    fig = px.scatter(x=df['week'].values, y=df['weight'].values)

    img_bytes = fig.to_image(format="png")
    output.write(img_bytes)

    output.seek(0)

    response = HttpResponse(
        output,
        content_type='image/png'
    )

    return response


# Feed anomly

@require_http_methods(["GET"])
def analysis_feed_graph(request):
    farms_ids = request.GET.get('farms', "") or ""
    breed_types_ids = request.GET.get('breed_type', "") or ""
    sex = request.GET.get('sex', "") or ""

    output = io.BytesIO()

    feeds = Feed.objects.all()

    if len(farms_ids) != 0:
        farms_ids = np.array(farms_ids.split(',') or []).astype(int)
        feeds = feeds.filter(chicken__farm__in=farms_ids)

    if len(breed_types_ids) != 0:
        breed_types_ids = np.array(
            breed_types_ids.split(',') or []).astype(int)
        feeds = feeds.filter(chicken__breed_type__in=breed_types_ids)

    if len(sex) != 0:
        feeds = feeds.filter(chicken__sex=sex)

    df = pd.DataFrame(list(feeds.values('week', 'chicken_id', 'weight')))

    fig = px.scatter(x=df['week'].values, y=df['weight'].values)

    img_bytes = fig.to_image(format="png")
    output.write(img_bytes)

    output.seek(0)

    response = HttpResponse(
        output,
        content_type='image/png'
    )

    return response


class AnalysisFeed(APIView):
    queryset = Feed.objects.all()

    def get(self, request):
        farms_ids = request.GET.get('farms', "") or ""
        breed_types_ids = request.GET.get('breed_type', "") or ""
        sex = request.GET.get('sex', "") or ""

        feeds = self.queryset

        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)
            feeds = feeds.filter(chicken__farm__in=farms_ids)

        if len(breed_types_ids) != 0:
            breed_types_ids = np.array(
                breed_types_ids.split(',') or []).astype(int)
            feeds = feeds.filter(chicken__breed_type__in=breed_types_ids)

        if len(sex) != 0:
            feeds = feeds.filter(chicken__sex=sex)

        if feeds.exists() == False:
            return Response({'results': []})

        df = pd.DataFrame(
            list(feeds.values('chicken__tag', 'chicken__sex', 'week', 'chicken_id', 'weight')))

        week_group = df.groupby('week')

        for name, group in week_group:
            isolation_model = IsolationForest(contamination=float(0.1))
            isolation_model.fit(group[['weight']].values)
            IF_predictions = isolation_model.predict(group[['weight']].values)
            group['anomalies'] = IF_predictions
            group['scores'] = isolation_model.decision_function(
                group[['weight']].values)

            df = pd.concat([df, group])

        df = df[df['anomalies'] == -1]
        df = df.sort_values(by=['scores'])

        parsed = loads(df.to_json(orient="records"))

        return Response({'results': parsed})


# Eggs

@require_http_methods(["GET"])
def analysis_egg_graph(request):
    farms_ids = request.GET.get('farms', "") or ""
    breed_types_ids = request.GET.get('breed_type', "") or ""
    sex = request.GET.get('sex', "") or ""

    output = io.BytesIO()

    eggs = Egg.objects.all()

    if len(farms_ids) != 0:
        farms_ids = np.array(farms_ids.split(',') or []).astype(int)
        eggs = eggs.filter(chicken__farm__in=farms_ids)

    if len(breed_types_ids) != 0:
        breed_types_ids = np.array(
            breed_types_ids.split(',') or []).astype(int)
        eggs = eggs.filter(chicken__breed_type__in=breed_types_ids)

    if len(sex) != 0:
        eggs = eggs.filter(chicken__sex=sex)

    df = pd.DataFrame(
        list(eggs.values('week', 'chicken_id', 'eggs', 'total_weight')))

    fig = px.scatter(x=df['week'].values, y=df['total_weight'].values)

    img_bytes = fig.to_image(format="png")
    output.write(img_bytes)

    output.seek(0)

    response = HttpResponse(
        output,
        content_type='image/png'
    )

    return response


class AnalysisEgg(APIView):
    queryset = Egg.objects.all()

    def get(self, request):
        farms_ids = request.GET.get('farms', "") or ""
        breed_types_ids = request.GET.get('breed_type', "") or ""
        sex = request.GET.get('sex', "") or ""

        feeds = self.queryset

        if len(farms_ids) != 0:
            farms_ids = np.array(farms_ids.split(',') or []).astype(int)
            feeds = feeds.filter(chicken__farm__in=farms_ids)

        if len(breed_types_ids) != 0:
            breed_types_ids = np.array(
                breed_types_ids.split(',') or []).astype(int)
            feeds = feeds.filter(chicken__breed_type__in=breed_types_ids)

        if len(sex) != 0:
            feeds = feeds.filter(chicken__sex=sex)

        if feeds.exists() == False:
            return Response({'results': []})

        df = pd.DataFrame(
            list(feeds.values('chicken__tag', 'chicken__sex', 'week', 'chicken_id', 'eggs', 'total_weight')))

        week_group = df.groupby('week')

        for name, group in week_group:
            isolation_model = IsolationForest(contamination=float(0.1))
            dataset = group[['eggs', 'total_weight']]
            isolation_model.fit(dataset.values)
            IF_predictions = isolation_model.predict(dataset.values)
            group['anomalies'] = IF_predictions
            group['scores'] = isolation_model.decision_function(
                dataset.values)

            df = pd.concat([df, group])

        df = df[df['anomalies'] == -1]
        df = df.sort_values(by=['scores'])

        parsed = loads(df.to_json(orient="records"))

        return Response({'results': parsed})
