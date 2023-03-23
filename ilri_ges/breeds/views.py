from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.contrib import messages

from .models import BreedType
from .forms import BreedForm


class BreedsView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'breeds/index.html')


class BreedsCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = BreedForm
        return render(request, 'breeds/create.html', {'form': form})

    def post(self, request):
        form = BreedForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('breeds')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request,
                           'Error occurred while creating, please check your data')
            return render(request, 'breeds/create.html', {'form': form})
        return render(request, 'breeds/index.html', {'form': form})


class BreedsEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = BreedType.objects.get(pk=id)
            form = BreedForm(instance=data)
            return render(request, 'breeds/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = BreedType.objects.get(pk=id)
            form = BreedForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                messages.success(request, 'Successfully Updated !')
                return redirect('breeds')
            else:
                return render(request, 'breeds/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class BreedTypesDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('breeds.delete_breedtype')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = BreedType.objects.get(id=id)
            breed_pair.delete()
            return redirect('breeds')
        except:
            return redirect(500)
