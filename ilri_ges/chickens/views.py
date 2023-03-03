import io
import math
import pandas as pd
from decimal import Decimal
from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

from chickens.models import Chicken
from .forms import ChickenForm


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
            return render(request, 'chickens/edit.html', {'form': form, "id": id})
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
            messages.success(request, 'Successfully Updated !')
            return render(request, 'chickens/edit.html', {'form': form})
        except Exception as ex:
            return redirect('500')


class ChickenImportView(View):
    def get(self, request):
        return render(request, 'import/index.html')

    def post(self, request):
        errors = []
        file_upload = request.FILES.get('file_upload')
        df = pd.read_excel(file_upload, header=0)
        df.columns = df.columns.str.lower()

        for index, row in df.iterrows():
            print('---------------------------------')
            print(row['id'])
            print(index)
            chicken = Chicken.objects.update_or_create(tag=row['id'])

        return HttpResponse({
            'errors': errors,
        })
