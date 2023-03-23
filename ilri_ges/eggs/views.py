from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.db.models import Q

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
            record_eggs = Egg.objects.filter(
                chicken=form.cleaned_data['chicken'], week=form.cleaned_data['week'])
            if record_eggs.exists():
                previous_egg_links = ""
                for e in record_eggs.iterator():
                    previous_egg_links += "<br><a href='/eggs/%s'> Tag: %s Week: %s Click to View</a>" % (
                        e.id, e.chicken.tag, e.week)
                messages.error(request,
                               'Error record for the given week %s already exists' % form.cleaned_data['week'] +
                               previous_egg_links)
            else:
                form = form.save(commit=False)
                form.created_by = request.user
                form.save()
                if form is not None:
                    return redirect('eggs')
                else:
                    messages.error(
                        request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request, 'Error please check your data')
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
                record_eggs = Egg.objects.filter(~Q(id=data.id),
                                                 chicken=form.cleaned_data['chicken'], week=form.cleaned_data['week'])
                if record_eggs.exists():
                    previous_egg_links = ""
                    for e in record_eggs.iterator():
                        previous_egg_links += "<br><a href='/eggs/%s'> Tag: %s Week: %s Click to View</a>" % (
                            e.id, e.chicken.tag, e.week)
                    messages.error(request,
                                   'Error record for the given week %s already exists' % form.cleaned_data['week'] +
                                   previous_egg_links)
                else:
                    form.save()
                    return redirect('eggs')
            return render(request, 'eggs/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')


class EggsDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('eggs.delete_egg')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Egg.objects.get(id=id)
            breed_pair.delete()
            return redirect('eggs')
        except:
            return redirect(500)
