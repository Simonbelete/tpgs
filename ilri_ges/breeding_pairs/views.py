from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from breeding_pairs.forms import BreedPair


class BreedPairView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'breeding_pairs/index.html')


class BreedPairCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = BreedPair
        return render(request, 'breeding_pairs/create.html', {'form': form})

    def post(self, request):
        pass
