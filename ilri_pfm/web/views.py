from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


MESSAGE_TAGS = {
    messages.DEBUG: 'alert-secondary',
    messages.INFO: 'alert-info',
    messages.SUCCESS: 'alert-success',
    messages.WARNING: 'alert-warning',
    messages.ERROR: 'alert-danger',
}


@require_http_methods(["GET"])
def index(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        return redirect('login')


def logout(request):
    logout(request)
    return redirect('index')


@require_http_methods(["GET", "POST"])
def login(request):
    return render(request, 'login.html')


@require_http_methods(["GET", "POST"])
def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                messages.success(request, ' welcome  !!')
                return redirect('index')
            else:
                messages.info(request, f'No user found')
        except Exception as e:
            print(e)
            messages.info(request, f'account done not exit please sign in')

    form = AuthenticationForm()
    return render(request, 'sign_in.html', context={'form': form})


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def home(request):
    return render(request, 'home.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def users(request):
    return render(request, 'users.html')
