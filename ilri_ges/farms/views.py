from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.models import Group, Permission
from django.contrib.auth import authenticate, logout, login

from .forms import FarmForm


class FarmsView(View):
    def get(self, request):
        return render(request, 'farms/index.html')


class FarmsCreateView(View):
    def get(self, request):
        form = FarmForm()
        return render(request, 'farms/create.html', {'form': form})

    def post(self, request):
        form = FarmForm(request.POST)
        if form.is_valid():
            farm = form.save()
            if farm is not None:
                return redirect('farms')
            else:
                messages.error(
                    request, f'Error occurred while creating farm, please check you data')
        return render(request, 'farms/create.html', {'form': form})


class FarmsEditView(View):
    def get(self, request):
        return render(request, 'farms/edit.html')
