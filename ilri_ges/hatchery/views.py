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
from .forms import HatcheryForm, IncubationForm, CandlingForm


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
    permission_required = ('hatchery.delete_hatchery')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Hatchery.objects.get(id=id)
            breed_pair.delete()
            return redirect('hatchery')
        except:
            return redirect(500)

# Incubation


class IncubationView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'incubation/index.html')


class IncubationCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        hatchery = request.GET.get('hatchery', None)
        form = IncubationForm(initial={'hatchery': hatchery})
        return render(request, 'incubation/create.html', {'form': form})

    def post(self, request):
        form = IncubationForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('incubation')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request,
                           'Error occurred while creating, please check your data')
            return render(request, 'incubation/create.html', {'form': form})
        return render(request, 'incubation/index.html', {'form': form})


class IncubationEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Incubation.objects.get(pk=id)
            form = IncubationForm(instance=data)
            return render(request, 'incubation/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Incubation.objects.get(pk=id)
            form = IncubationForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                messages.success(request, 'Successfully Updated !')
                return redirect('incubation')
            else:
                return render(request, 'incubation/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class IncubationDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('hatchery.delete_incubation')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Incubation.objects.get(id=id)
            breed_pair.delete()
            return redirect('incubation')
        except:
            return redirect(500)


# Candling


class CandlingView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'candling/index.html')


class CandlingCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        hatchery = request.GET.get('hatchery', None)
        form = CandlingForm(initial={'hatchery': hatchery})
        return render(request, 'candling/create.html', {'form': form})

    def post(self, request):
        form = CandlingForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('candling')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request,
                           'Error occurred while creating, please check your data')
            return render(request, 'candling/create.html', {'form': form})
        return render(request, 'candling/index.html', {'form': form})


class CandlingEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Candling.objects.get(pk=id)
            form = CandlingForm(instance=data)
            return render(request, 'candling/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Candling.objects.get(pk=id)
            form = CandlingForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                messages.success(request, 'Successfully Updated !')
                return redirect('candling')
            else:
                return render(request, 'candling/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class CandlingDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('hatchery.delete_candling')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Candling.objects.get(id=id)
            breed_pair.delete()
            return redirect('candling')
        except:
            return redirect(500)


# Hatchery incubation & candling

class HatcheryIncubation(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Hatchery.objects.get(pk=id)
            return render(request, 'hatchery/hatchery_incubation.html', {"id": id, "data": data})
        except Exception as ex:
            print('-------------------------')
            print(ex)
            return redirect('404')


class HatcheryCandling(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Hatchery.objects.get(pk=id)
            return render(request, 'hatchery/hatchery_candling.html', {"id": id, "data": data})
        except:
            return redirect('404')
