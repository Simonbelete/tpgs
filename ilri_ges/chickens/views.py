import io
import pandas as pd
import numpy as np
from dateutil.parser import parse
from decimal import Decimal
from datetime import datetime
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
from .forms import ChickenForm, ChickenStateForm, ChickenImportForm, ChickenCreateForm, ChickenExportForm
from core.views import ModelFilterViewSet
from farms.models import Farm
from breeds.models import BreedType
from locations.models import House
from flocks.models import Flock


class ChickenView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'chickens/index.html')


class ChickenCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = ChickenCreateForm
        return render(request, 'chickens/create.html', {'form': form})

    def post(self, request):
        form = ChickenCreateForm(request.POST)
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
            form2 = ChickenStateForm(instance=data)
            return render(request, 'chickens/edit.html', {'form': form, "data": data, "id": id, 'state_form': form2})
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
                messages.error(request, 'Error, please check your data')
            return render(request, 'chickens/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class ChickenDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('chickens.delete_chicken')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
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
        try:
            data = Chicken.objects.get(pk=id)
            return render(request, 'chickens/chicken_eggs.html', {"id": id, "data": data})
        except:
            return redirect(400)


class ChickenWeights(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Chicken.objects.get(pk=id)
            return render(request, 'chickens/chicken_weights.html', {"id": id, "data": data})
        except:
            return redirect(400)


class ChickenFeed(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Chicken.objects.get(pk=id)
            return render(request, 'chickens/chicken_feeds.html', {"id": id, "data": data})
        except:
            return redirect(400)


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
            return redirect('chickens')
            # return render(request, 'chickens/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class ChickenImportView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = ChickenImportForm
        return render(request, 'import/index.html', {'form': form})

    def post(self, request):
        errors = []
        file_upload = request.FILES.get('file_upload')
        farm_id = request.GET.get('farm', 0)
        breed_type_id = request.GET.get('breed_type', 0)

        try:
            breed_type = BreedType.objects.get(pk=breed_type_id)
        except:
            breed_type = None
        try:
            farm = Farm.objects.get(pk=farm_id)
        except:
            farm = None

        # absolute_path = os.path.dirname(__file__)
        # full_path = os.path.join(
        #     absolute_path, '../../horro_chickens_fake.xlsx')
        # file_upload = full_path
        df = pd.read_excel(file_upload, header=0)

        df = df.replace(np.nan, None)  # nan to None

        df.columns = df.columns.str.lower()
        df.iloc[0] = df.iloc[0].apply(str.lower)

        df.columns.values[0:9] = 'chicken'

        col_weeks = len(df.columns[9:]) / 5

        # if (len(df.columns[9:]) % 2 != 0):
        #     return HttpResponse("Invalid Columns")
        # else:
        col_weeks = int(col_weeks)

        for col_w in range(0, col_weeks):
            start_col = 9 + col_w * 5
            end_col = start_col + 5
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
            mortality = row['chicken', "mortality"].values[0]
            hatch_date = row['chicken', "hatch date"].values[0]
            sire_id = row['chicken', "sire id"].values[0]
            dam_id = row['chicken', "dam id"].values[0]
            if (tag == None):
                continue
            try:
                if house_name != None:
                    house, house_created = House.objects.get_or_create(name=house_name, defaults={
                        'created_by': self.request.user
                    })
                else:
                    house = None
                if flock_name != None:
                    flock, flock_created = Flock.objects.get_or_create(name=flock_name, defaults={
                        'created_by': self.request.user
                    })
                else:
                    flock = None
                if mortality != None:
                    if isinstance(hatch_date, datetime):
                        mortality = mortality.strftime("%Y-%m-%d")
                    else:
                        mortality = datetime.strptime(mortality, '%d/%m/%y')
                    is_dead = True
                else:
                    is_dead = False

                print('---------------------------------------------')
                print(row['chicken', "hatch date"].values)
                print(hatch_date)
                if hatch_date != None:
                    # hatch_date = hatch_date.strftime("%d/%m/%Y")
                    if type(hatch_date) == np.ndarray:
                        hatch_date = hatch_date[0].astype(datetime)
                    elif isinstance(hatch_date, datetime):
                        hatch_date = hatch_date.strftime("%Y-%m-%d")
                    else:
                        hatch_date = datetime.strptime(hatch_date, '%d/%m/%y')

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
                    tag=tag, defaults={
                        'sex': sex,
                        'breed_pair': breed_pair,
                        'farm': farm,
                        'breed_type': breed_type,
                        'house': house,
                        'flock': flock,
                        'pen': pen_name,
                        'is_dead': is_dead,
                        'dead_date': mortality,
                        'hatch_date': hatch_date,
                        'created_by': self.request.user})
                for week in weeks:
                    week_no = week.split(" ")[-1]
                    weight = row[week, "weight"].values[0]
                    feed_offered_weight = row[week,
                                              "feed offered"].values[0]
                    feed_refusal_weight = row[week,
                                              "feed refusal"].values[0]
                    eggs = row[week, "egg"].values[0]
                    eggs_weights = row[week, "egg weight"].values[0]
                    if weight != None:
                        weight, weight_created = Weight.objects.update_or_create(
                            week=week_no, chicken=chicken, defaults={'weight': Decimal(weight), 'created_by': self.request.user})
                    if eggs != None:
                        egg, egg_created = Egg.objects.update_or_create(
                            week=week_no, chicken=chicken, defaults={'eggs': int(eggs), 'total_weight': Decimal(eggs_weights), 'created_by': self.request.user})
                    if feed_offered_weight != None:
                        feed_weight = Decimal(
                            feed_offered_weight) - Decimal(feed_refusal_weight)
                        print(feed_weight)
                        feed, feed_created = Feed.objects.update_or_create(
                            week=week_no, chicken=chicken, defaults={'feed_offered': Decimal(feed_offered_weight), 'feed_refusal': Decimal(feed_refusal_weight), 'created_by': self.request.user})
            except Exception as ex:
                errors.append({'data': {
                    'week': week_no,
                    'tag': tag,
                    'sex': sex
                }, 'exception': str(ex)})
                # raise ex

        return JsonResponse({
            'errors': errors,
        })


class ChickenExportView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = ChickenExportForm
        return render(request, 'export/chicken_export.html', {'form': form})

    def post(self, request):
        form = ChickenExportForm(request.POST)
        chickens = Chicken.objects.all()
        if not form.is_valid():
            return render(request, 'export/chicken_export.html', {'form': form})

        chickens = chickens.filter(
            breed_type=form.cleaned_data['breed_type'], farm=form.cleaned_data['farm'], house=form.cleaned_data['house'])

        output = io.BytesIO()
        cols = [
            ['chicken', 'chicken', 'chicken', 'chicken', 'chicken', 'chicken',
                'chicken', 'chicken', 'chicken'],
            ['ID', 'SEX', 'SIRE ID', 'DAM ID', 'HATCH DATE',
                'HOUSE', 'Pen', 'Batch', 'Mortality']
        ]

        for week in range(form.cleaned_data['start_week'], form.cleaned_data['end_week'] + 1):
            cols[0].append('Week %s' % week)
            cols[0].append('Week %s' % week)
            cols[0].append('Week %s' % week)
            cols[0].append('Week %s' % week)
            cols[0].append('Week %s' % week)

            cols[1].append('Weight')
            cols[1].append('Egg')
            cols[1].append('Egg Weight')
            cols[1].append('Feed Offered')
            cols[1].append('Feed Refusal')

        tuples = list(zip(*cols))
        columns = pd.MultiIndex.from_tuples(tuples)
        data = []

        for chicken in chickens.iterator():
            row = []
            # chicken.values_list(
            #     'tag', 'sex', 'breed_pair__sire', 'breed_pair__dam', 'hatch_date', 'house__name', 'pen', 'flock__name', 'dead_date', flat=True)
            row.append(chicken.tag)
            row.append(chicken.sex)
            row.append(
                chicken.breed_pair.sire if chicken.breed_pair != None else "")
            row.append(
                chicken.breed_pair.dam if chicken.breed_pair != None else "")
            row.append(chicken.hatch_date.strftime('%d/%m/%Y')
                       if chicken.hatch_date != None else "")
            row.append(chicken.house.name if chicken.house != None else "")
            row.append(chicken.pen)
            row.append(chicken.flock.name if chicken.flock != None else "")
            row.append(chicken.dead_date.strftime('%d/%m/%Y')
                       if chicken.dead_date != None else "")

            for week in range(form.cleaned_data['start_week'], form.cleaned_data['end_week'] + 1):
                weight = Weight.objects.filter(chicken=chicken, week=week)
                if weight.exists():
                    row.append(weight[0].weight)
                else:
                    row.append("")
                egg = Egg.objects.filter(chicken=chicken, week=week)
                if egg.exists():
                    row.append(egg[0].eggs)
                    row.append(egg[0].total_weight)
                else:
                    row.append("")
                    row.append("")
                feed = Feed.objects.filter(chicken=chicken, week=week)
                if feed.exists():
                    row.append(feed[0].feed_offered)
                    row.append(feed[0].feed_refusal)
                else:
                    row.append("")
                    row.append("")
            data.append(row)

        df = pd.DataFrame(data, columns=columns)
        # create excel writer object
        writer = pd.ExcelWriter(output)
        # write dataframe to excel
        df.to_excel(writer)
        # save the excel
        writer.save()

        # Rewind the buffer.
        output.seek(0)

        filename = 'report.xlsx'
        response = HttpResponse(
            output,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response

# Reports


class ChickensReportFeedByWeight(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'reports/feed_by_weight.html')
