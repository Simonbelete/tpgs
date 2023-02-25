import io
import math
import pandas as pd
from decimal import Decimal
from django.shortcuts import render
from django.views import View
from datetime import date, timedelta, datetime
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, HttpResponseNotFound

from weights.forms import WeightForm
from weights.models import Weight
from chickens.models import Chicken
from flocks.models import Flock
from breeds.models import BreedType


class WeightsView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'weights/index.html')


class WeightsCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = WeightForm()
        return render(request, 'weights/create.html', {'form': form})

    def post(self, request):
        pass


class WeightsImportView(View):
    def get(self, request):
        return render(request, 'import/index.html')

    def post(self, request):
        errors = []
        file_upload = request.FILES.get('file_upload')
        df_info = pd.read_excel(file_upload, header=None, usecols=[0, 1, 2])
        df = pd.read_excel(file_upload, header=4)
        df.columns = df.columns.str.lower()

        flock_name = df_info.iloc[0][1]
        breed_name = df_info.iloc[1][1]
        hatch_date = df_info.iloc[2][1]
        hatch_date = datetime.strptime(hatch_date, "%d/%m/%Y").date()

        flock, flock_created = Flock.objects.get_or_create(
            name=flock_name, hatch_date=hatch_date, created_by=self.request.user)
        breed, breed_created = BreedType.objects.get_or_create(
            name=breed_name, created_by=self.request.user)

        for index, row in df.iterrows():
            chicken, created = Chicken.objects.get_or_create(
                tag=row['id'], layed_date=hatch_date, sex=row['sex'], flock=flock, breed_type=breed, created_by=self.request.user)
            for column in df.columns[2:]:
                try:
                    if (math.isnan(float(row[column]))):
                        continue
                    week = Decimal(column.split()[1])
                    weight = Weight.objects.get_or_create(
                        chicken=chicken, weight=Decimal(row[column]), week=week, created_by=self.request.user)
                except Exception as ex:
                    errors.append({'row': row, 'exception': ex})

        return HttpResponse({
            'errors': errors,
        })
