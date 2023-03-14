from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Egg
from .forms import EggForm


class EggsView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'eggs/index.html')


class HDEPView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'hdep/index.html', {'group': request.GET.get('group', 'chicken')})


class EggsCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = EggForm
        return render(request, 'eggs/create.html', {'form': form})

    def post(self, request):
        form = EggForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('eggs')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        return render(request, 'eggs/create.html', {'form': form})


class EggsEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Egg.objects.get(pk=id)
            form = EggForm(instance=data)
            return render(request, 'eggs/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Egg.objects.get(pk=id)
            form = EggForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
            messages.success(request, 'Successfully Updated !')
            return render(request, 'eggs/edit.html', {'form': form})
        except Exception as ex:
            return redirect('500')
