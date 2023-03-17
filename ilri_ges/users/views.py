import logging
from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.models import Group, Permission
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.mixins import LoginRequiredMixin

from users.forms import LoginForm, UserForm
from .models import User


class LoginView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard')
        form = LoginForm()
        return render(request, 'login/index.html', {'form': form})

    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                request, email=form.cleaned_data['email'], password=form.cleaned_data['password'],)
            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
                messages.error(request, f'No user found')
        return render(request, 'login/index.html', {'form': form})


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('index')


class UsersView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'users/index.html')


class UsersCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    logger = logging.getLogger(__name__)

    def get(self, request):
        form = UserForm()
        return render(request, 'users/create.html', {'form': form})

    def post(self, request):
        form = UserForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
                form.cleaned_data['email'], form.cleaned_data['password'], name=form.cleaned_data['name'], farms=form.cleaned_data['farms'])
            farmer_group = Group.objects.get(
                name='farmer')
            farmer_group.user_set.add(user)
            if user is not None:
                self.logger.error('Failed to create user')
                return redirect('users')
            else:
                messages.error(request, f'Error occurred while creating user')
        return render(request, 'users/create.html', {'form': form})


class UsersEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = User.objects.get(pk=id)
            form = UserForm(instance=data)
            return render(request, 'users/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = User.objects.get(pk=id)
            form = UserForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
                messages.success(request, 'Successfully Updated !')
                return redirect('users')
            else:
                return render(request, 'users/edit.html', {'form': form})
        except Exception as ex:
            return redirect('500')
