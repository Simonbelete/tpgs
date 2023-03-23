import io
import math
import pandas as pd
from decimal import Decimal
from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from datetime import date, timedelta, datetime
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.http import HttpResponse
from django.db.models import Q

from weights.forms import WeightForm
from weights.models import Weight
from chickens.models import Chicken
from flocks.models import Flock
from breeds.models import BreedType


class GrowthPerformanceView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'growth_preformance/index.html')


class WeightsView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'weights/index.html')


class WeightsCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = WeightForm
        return render(request, 'weights/create.html', {'form': form})

    def post(self, request):
        form = WeightForm(request.POST)
        if form.is_valid():
            record_weight = Weight.objects.filter(
                chicken=form.cleaned_data['chicken'], week=form.cleaned_data['week'])
            if record_weight.exists():
                previous_weight_links = ""
                for e in record_weight.iterator():
                    previous_weight_links += "<br><a href='/weights/%s'> Tag: %s Week %s Click to View</a>" % (
                        e.id, e.chicken.tag, e.week)
                messages.error(
                    request, 'Error record for the given week %s already exists' % form.cleaned_data['week'] + previous_weight_links)
        else:
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('weights')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        return render(request, 'weights/create.html', {'form': form})


class WeightsEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Weight.objects.get(pk=id)
            form = WeightForm(instance=data)
            return render(request, 'weights/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Weight.objects.get(pk=id)
            form = WeightForm(request.POST, instance=data)
            if form.is_valid():
                record_weights = Weight.objects.filter(~Q(id=data.id),
                                                       chicken=form.cleaned_data['chicken'], week=form.cleaned_data['week'])
                if record_weights.exists():
                    previous_weights_links = ""
                    for e in record_weights.iterator():
                        previous_weights_links += "<br><a href='/weights/%s'> Tag: %s Week: %s Click to View</a>" % (
                            e.id, e.chicken.tag, e.week)
                    messages.error(request,
                                   'Error record for the given week %s already exists' % form.cleaned_data['week'] +
                                   previous_weights_links)
                else:
                    form.save()
                    return redirect('eggs')
            return render(request, 'weights/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


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


class WeightDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('weights.delete_weight')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Weight.objects.get(id=id)
            breed_pair.delete()
            return redirect('weights')
        except:
            return redirect(500)
