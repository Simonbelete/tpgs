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


class UsersView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'users/index.html')


class UsersCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

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
                return redirect('users')
            else:
                messages.error(request, f'Error occurred while creating user')
        return render(request, 'users/create.html', {'form': form})


class UsersEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'users/edit.html')
