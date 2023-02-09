from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate


def index(request):
    return render(request, 'index.html', {})


def signIn(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = authenticate(request, email=email, password=password)
        except:
            messages.info(request, f'account done not exit please sign in')

    return render(request, 'sign_in.html')
