from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from breeding_pairs.forms import BreedPairForm
from chickens.models import Chicken
from .models import BreedPair

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
        form = BreedPairForm
        return render(request, 'breeding_pairs/create.html', {'form': form})

    def post(self, request):
        dams_ids = request.POST.getlist('dams') or []
        sire_id = request.POST.get('sire') or 0
        date = request.POST.get('date') or None

        sire = Chicken.objects.get(pk=sire_id)

        pairs = []
        for dam_id in dams_ids:
            dam = Chicken.objects.get(pk=dam_id)
            pair = BreedPairForm(
                sire=sire, dam=dam, date=None, created_by=request.user)
            pair.save()
            pairs.append(pair)

        messages.error(request, GENERIC_ERROR_MESSAGE_CREATE)
        return render(request, 'breeding_pairs/create.html', context={'data': request.POST, 'form': form})


class BreedPairEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = BreedPair.objects.get(pk=id)
            form = BreedPairForm(instance=data)
            return render(request, 'breeding_pairs/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = BreedPair.objects.get(pk=id)
            form = BreedPairForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                messages.success(request, 'Successfully Updated !')
                return redirect('breeding_pairs')
            else:
                return render(request, 'breeding_pairs/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class BreedPairDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('breeding_pairs.delete_breedpair')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = BreedPair.objects.get(id=id)
            breed_pair.delete()
            return redirect('breeding_pairs')
        except:
            return redirect(500)
