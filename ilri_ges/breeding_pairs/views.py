from django.shortcuts import render
from django.views import View
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

from breeding_pairs.forms import BreedPair
from chickens.models import Chicken

GENERIC_ERROR_MESSAGE_CREATE = 'Error: Please check you inputs and try again!'


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
        dams_ids = request.POST.getlist('dams') or []
        sire_id = request.POST.get('sire') or 0
        date = request.POST.get('date') or None

        sire = Chicken.objects.get(pk=sire_id)

        pairs = []
        for dam_id in dams_ids:
            dam = Chicken.objects.get(pk=dam_id)
            pair = BreedPair(
                sire=sire, dam=dam, date=None, created_by=request.user)
            pair.save()
            pairs.append(pair)

        messages.error(request, GENERIC_ERROR_MESSAGE_CREATE)
        return render(request, 'breeding_pairs/create.html', context={'data': request.POST, 'form': form})
