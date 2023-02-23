from django.shortcuts import render

from users.forms import LoginForm


def index(request):
    form = LoginForm()
    return render(request, 'login/index.html', {'form': form})
