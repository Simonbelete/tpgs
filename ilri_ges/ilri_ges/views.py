from django.shortcuts import render, redirect


def index(request):
    return render(request, 'main.html')


def page404(request):
    return render(request, 'dashboard_404.html')


def page500(request):
    return render(request, 'dashboard_500.html')


def playground_d3js(request):
    return render(request, 'd3js_eg.html')


def error_404(request, exception):
    return render(request, '400.html')


def error_500(request):
    return render(request, '500.html')
