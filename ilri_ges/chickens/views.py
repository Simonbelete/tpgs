import os
import pandas as pd
import numpy as np
from decimal import Decimal
from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from chickens.models import Chicken
from weights.models import Weight
from eggs.models import Egg
from feeds.models import Feed
from breeding_pairs.models import BreedPair
from .forms import ChickenForm, ChickenStateForm, ChickenImportForm
from core.views import ModelFilterViewSet
from farms.models import Farm
from breeds.models import BreedType


class ChickenView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'chickens/index.html')


class ChickenCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = ChickenForm
        return render(request, 'chickens/create.html', {'form': form})

    def post(self, request):
        form = ChickenForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('chickens')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request,
                           'Error occurred while creating, please check your data')
            return render(request, 'chickens/create.html', {'form': form})
        return render(request, 'chickens/index.html', {'form': form})


class ChickenEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Chicken.objects.get(pk=id)
            form = ChickenForm(instance=data)
            return render(request, 'chickens/edit.html', {'form': form, "data": data, "id": id, 'state_form': ChickenStateForm})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Chicken.objects.get(pk=id)
            form = ChickenForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                return redirect('chickens')
            else:
                messages.error('Error, please check your data')
            return render(request, 'chickens/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class ChickenDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('chickens.delete_chicken')

    def post(self, request, id=0):
        if id == 0:
            return HttpResponse(500)
        try:
            chicken = Chicken.objects.get(id=id)
            chicken.delete()
            return redirect('chickens')
        except:
            return redirect(500)


class ChickenEgg(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        return render(request, 'chickens/chicken_eggs.html', {"id": id})


class ChickenWeights(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        return render(request, 'chickens/chicken_weights.html', {"id": id})


class ChickenFeed(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        return render(request, 'chickens/chicken_feeds.html', {"id": id})


class ChickenPartners(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        return render(request, 'chickens/chicken_partners.html', {"id": id})


class ChickenOffsprings(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        return render(request, 'chickens/chicken_offsprings.html', {"id": id})


class ChickenStateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')

        try:
            form = ChickenStateForm(request.POST)
            if form.is_valid():
                chicken = Chicken.objects.get(pk=id)
                chicken.is_dead = form.cleaned_data['is_dead']
                chicken.dead_date = form.cleaned_data['dead_date']
                # chicken.days_alive = form.cleaned_data['days_alive']
                chicken.save()
                messages.success(request, 'Updated Successfully')
            return render(request, 'chickens/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class ChickenImportView(View):
    def get(self, request):
        form = ChickenImportForm
        return render(request, 'import/index.html', {'form': form})

    def post(self, request):
        errors = []
        file_upload = request.FILES.get('file_upload')
        farm_id = request.POST.get('farm', None)
        breed_type_id = request.POST.get('breed_type', None)

        # absolute_path = os.path.dirname(__file__)
        # full_path = os.path.join(
        #     absolute_path, '../../horro_chickens_fake.xlsx')
        # file_upload = full_path
        df = pd.read_excel(file_upload, header=0)

        df = df.head()

        df.columns = df.columns.str.lower()
        df.iloc[0] = df.iloc[0].apply(str.lower)

        df.columns.values[0:9] = 'chicken'

        col_weeks = len(df.columns[9:]) / 4

        if (len(df.columns[9:]) % 2 != 0):
            return HttpResponse("Invalid Columns")
        else:
            col_weeks = int(col_weeks)

        for col_w in range(0, col_weeks):
            start_col = 9 + col_w * 4
            end_col = start_col + 4
            df.columns.values[start_col:end_col] = df.columns[start_col]

        tuple = list(zip(df.columns, df.iloc[0]))
        index = pd.MultiIndex.from_tuples(tuple, names=['first', 'second'])
        df.columns = index
        df = df.drop([0])

        weeks = index.get_level_values(0).values
        weeks = np.unique(weeks)
        weeks = weeks[weeks != 'chicken']

        for i, row in df.groupby(level=0):
            tag = str(row['chicken', "id"].values[0])
            sex = row['chicken', "sex"].values[0]
            house_name = row['chicken', "house"].values[0]
            pen_name = row['chicken', "pen"].values[0]
            flock_name = row['chicken', "batch"].values[0]
            days_alive = row['chicken', "mortality"].values[0]
            hatch_date = row['chicken', "hatch date"].values[0]
            sire_id = row['chicken', "sire id"].values[0]
            dam_id = row['chicken', "dam id"].values[0]
            try:
                sire = Chicken.objects.all().filter(tag=sire_id)
                dam = Chicken.objects.all().filter(tag=dam_id)
                sire = sire[0] if sire else None
                dam = dam[0] if dam else None
                if (sire and dam):
                    breed_pair, breed_pair_created = BreedPair.objects.get_or_create(
                        sire=sire, dam=dam, created_by=self.request.user)
                else:
                    breed_pair = None
                chicken, chicken_created = Chicken.objects.update_or_create(
                    tag=tag, defaults={'sex': sex, 'breed_pair': breed_pair, 'farm': farm_id, 'breed_type': breed_type_id, 'created_by': self.request.user})
                for week in weeks:
                    week_no = week.split(" ")[-1]
                    weight = row[week, "weight"].values[0]
                    feed_weight = row[week, "feed"].values[0]
                    eggs = row[week, "egg"].values[0]
                    eggs_weights = row[week, "egg weight"].values[0]
                    weight, weight_created = Weight.objects.update_or_create(
                        week=week_no, chicken=chicken, weight=Decimal(weight), created_by=self.request.user)
                    egg, egg_created = Egg.objects.update_or_create(
                        week=week_no, chicken=chicken, eggs=int(eggs), total_weight=Decimal(eggs_weights), created_by=self.request.user)
                    feed, feed_created = Feed.objects.update_or_create(
                        week=week_no, chicken=chicken, weight=Decimal(feed_weight), created_by=self.request.user)
            except Exception as ex:
                errors.append({'data': {
                    'tag': tag,
                    'sex': sex
                }, 'exception': str(ex)})
        return JsonResponse({
            'errors': errors,
        })
