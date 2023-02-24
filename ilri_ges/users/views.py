from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth import authenticate, logout, login

from users.forms import LoginForm


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


class UserView(View):
    def get(self, request):
        return render(request, 'users/index.html')
