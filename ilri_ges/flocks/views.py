import os
import pandas as pd
import numpy as np
from decimal import Decimal
from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from .models import Flock
from .forms import FlockForm


class FlocksView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'flocks/index.html')


class FlocksCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = FlockForm
        return render(request, 'flocks/create.html', {'form': form})

    def post(self, request):
        form = FlockForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('flocks')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request,
                           'Error occurred while creating, please check your data')
            return render(request, 'flocks/create.html', {'form': form})
        return render(request, 'flocks/index.html', {'form': form})


class FlocksEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Flock.objects.get(pk=id)
            form = FlockForm(instance=data)
            return render(request, 'flocks/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Flock.objects.get(pk=id)
            form = FlockForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                messages.success(request, 'Successfully Updated !')
                return redirect('flocks')
            else:
                return render(request, 'flocks/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class FlockDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('flocks.delete_flock')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Flock.objects.get(id=id)
            breed_pair.delete()
            return redirect('flocks')
        except:
            return redirect(500)
