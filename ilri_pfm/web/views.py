from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


def index(request):
    return render(request, 'index.html', {})


def signIn(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        print('----------------------------------')
        print(email)
        print(password)
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
