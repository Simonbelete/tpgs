from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.models import Group, Permission
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, logout, login

from .forms import FarmForm
from .models import Farm


class FarmsView(View):
    def get(self, request):
        return render(request, 'farms/index.html')


class FarmsCreateView(LoginRequiredMixin, View):
    ogin_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = FarmForm
        return render(request, 'farms/create.html', {'form': form})

    def post(self, request):
        form = FarmForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('farms')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        return render(request, 'farms/create.html', {'form': form})


class FarmsEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')

        try:
            data = Farm.objects.get(pk=id)
            form = FarmForm(instance=data)
            return render(request, 'farms/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Farm.objects.get(pk=id)
            form = FarmForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
            messages.success(request, 'Successfully Updated !')
            return render(request, 'farms/edit.html', {'form': form})
        except Exception as ex:
            return redirect('500')
