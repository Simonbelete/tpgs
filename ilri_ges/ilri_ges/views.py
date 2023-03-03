from django.shortcuts import render, redirect


def index(request):
    return redirect('dashboard')


def page404(request):
    return render(request, '404.html')


def page500(request):
    return render(request, '500.html')


def playground_d3js(request):
    return render(request, 'd3js_eg.html')
