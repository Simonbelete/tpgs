from django.shortcuts import render, redirect


def index(request):
    return redirect('dashboard')


def playground_d3js(request):
    return render(request, 'd3js_eg.html')
