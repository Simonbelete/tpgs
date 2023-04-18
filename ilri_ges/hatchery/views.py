import os
import pandas as pd
import numpy as np
from decimal import Decimal
from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from .models import Hatchery, Incubation, Candling
from .forms import HatcheryForm


class HatcheryView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'hatchery/index.html')


class HatcheryCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = HatcheryForm
        return render(request, 'hatchery/create.html', {'form': form})

    def post(self, request):
        form = HatcheryForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('hatchery')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request,
                           'Error occurred while creating, please check your data')
            return render(request, 'hatchery/create.html', {'form': form})
        return render(request, 'hatchery/index.html', {'form': form})


class HatcheryEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Hatchery.objects.get(pk=id)
            form = HatcheryForm(instance=data)
            return render(request, 'hatchery/edit.html', {'form': form, "id": id})
        except Exception as ex:
            print('---------------------')
            print(ex)
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Hatchery.objects.get(pk=id)
            form = HatcheryForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                messages.success(request, 'Successfully Updated !')
                return redirect('hatchery')
            else:
                return render(request, 'hatchery/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class HatcheryDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('hatchery.delete_flock')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Hatchery.objects.get(id=id)
            breed_pair.delete()
            return redirect('hatchery')
        except:
            return redirect(500)
