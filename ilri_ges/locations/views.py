import io
import math
import pandas as pd
from decimal import Decimal
from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import CountryForm, CityForm, HouseForm, LayedPlaceForm
from .models import Country, City, House, LayedPlace


class CountriesView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'countries/index.html')


class CountriesCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = CountryForm
        return render(request, 'countries/create.html', {'form': form})

    def post(self, request):
        form = CountryForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('countries')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        return render(request, 'countries/index.html')


class CountriesEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        print('---------------------')
        print(id)
        if id == 0:
            return redirect('404')
        return render(request, 'countries/edit.html')


class CitiesView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'cities/index.html')


class CitiesCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = CityForm
        return render(request, 'cities/create.html', {'form': form})

    def post(self, request):
        form = CityForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('countries')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        return render(request, 'countries/index.html')


class CitiesEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        data = Country.objects.get(pk=id)
        form = CityForm(instance=data)
        return render(request, 'houses/index.html', {'form': form})


class HousesView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        return render(request, 'houses/index.html')


class LayedPlacesView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'layed_places/index.html')
