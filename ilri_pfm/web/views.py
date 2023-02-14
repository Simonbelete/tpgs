from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.http import HttpResponseRedirect
from django.contrib.auth import login, authenticate, logout
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count

import api.models as models
from api.v1 import serializers
from web import forms

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


def logout_page(request):
    logout(request)
    return redirect('index')


@require_http_methods(["GET", "POST"])
def login_page(request):
    if request.method == 'POST':
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                request, email=form.cleaned_data['email'], password=form.cleaned_data['password'],)
            if user is not None:
                login(request, user)
                messages.success(request, ' welcome  !!')
                return redirect('index')
            else:
                messages.info(request, f'No user found')
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
    users_count = models.User.objects.count()
    flocks_count = models.Flock.objects.count()
    farms_count = models.Farm.objects.count()
    chicken_count = models.Chicken.objects.count()
    eggs_count = models.Egg.objects.count()
    breed_types = models.BreedType.objects.annotate(
        chicken_count=Count('chickens'))
    context = {
        'statics_count': {
            'users_count': users_count,
            'flocks_count': flocks_count,
            'farms_count': farms_count,
            'chicken_count': chicken_count,
            'eggs_count': eggs_count
        },
        'breed_type': {
            'chicken_count': models.Chicken.objects.count(),
            'results': serializers.BreedTypeSerializer_GET_V1(breed_types, many=True).data
        }
    }
    return render(request, 'home.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def users(request):
    if request.method == 'POST':
        form = forms.UserForm(request.POST)
        if form.is_valid():
            user = models.User.objects.get_or_create(
                name=form.cleaned_data['name'], email=form.cleaned_data['email'], password=form.cleaned_data['password'])
            return HttpResponseRedirect('/home/users/')
        else:
            return HttpResponseRedirect('/home/users')
    else:
        return render(request, 'users.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def user_edit(request, id=0):
    if request.method == 'POST':
        instance = models.User.objects.get(pk=id)
        form = forms.UserForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/users')
        else:
            return HttpResponseRedirect(f'/home/users/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.User.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'user_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def feed_types(request):
    if request.method == 'POST':
        form = forms.FeedTypeForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/feed-types/')
        else:
            return HttpResponseRedirect('/home/feed-types')
    else:
        return render(request, 'feed_types.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def feed_type_edit(request, id=0):
    if request.method == 'POST':
        instance = models.FeedType.objects.get(pk=id)
        form = forms.FeedTypeForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/feed-types')
        else:
            return HttpResponseRedirect(f'/home/feed-types/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.FeedType.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'feed_type_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def layed_place(request):
    if request.method == 'POST':
        form = forms.LayedPlaceForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/layed-places/')
        else:
            return HttpResponseRedirect('/home/layed-places')
    else:
        return render(request, 'layed_places.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def layed_place_edit(request, id=0):
    if request.method == 'POST':
        instance = models.LayedPlace.objects.get(pk=id)
        form = forms.LayedPlaceForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/layed-places')
        else:
            return HttpResponseRedirect(f'/home/layed-places/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.LayedPlace.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'layed_place_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def stages(request):
    if request.method == 'POST':
        form = forms.StageForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/stages/')
        else:
            return HttpResponseRedirect('/home/stages')
    else:
        return render(request, 'stages.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def stage_edit(request, id=0):
    if request.method == 'POST':
        instance = models.Stage.objects.get(pk=id)
        form = forms.StageForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/stages')
        else:
            return HttpResponseRedirect(f'/home/stages/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.Stage.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'stage_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def breed_types(request):
    if request.method == 'POST':
        form = forms.BreedTypeForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/breed-types/')
        else:
            return HttpResponseRedirect('/home/breed-types')
    else:
        return render(request, 'breed_types.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def breed_type_edit(request, id=0):
    if request.method == 'POST':
        instance = models.BreedType.objects.get(pk=id)
        form = forms.BreedTypeForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/breed-types')
        else:
            return HttpResponseRedirect(f'/home/breed-types/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.BreedType.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'breed_type_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def farms(request):
    if request.method == 'POST':
        form = forms.FarmForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/farms/')
        else:
            return HttpResponseRedirect('/home/farms')
    else:
        return render(request, 'farms.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def farm_edit(request, id=0):
    if request.method == 'POST':
        instance = models.Farm.objects.get(pk=id)
        form = forms.FarmForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/farms')
        else:
            return HttpResponseRedirect(f'/home/farms/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.Farm.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'farm_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def chickens(request):
    if request.method == 'POST':
        form = forms.ChickenForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/farms/')
        else:
            return HttpResponseRedirect('/home/farms')
    else:
        return render(request, 'chickens.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def chickens_edit(request, id=0):
    if request.method == 'POST':
        instance = models.Chicken.objects.get(pk=id)
        form = forms.ChickenForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/farms')
        else:
            return HttpResponseRedirect(f'/home/farms/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.Chicken.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'chicken_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def feeds(request):
    if request.method == 'POST':
        form = forms.FeedForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/feeds/')
        else:
            return HttpResponseRedirect('/home/feeds?error=true')
    else:
        return render(request, 'feeds.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def feed_edit(request, id=0):
    if request.method == 'POST':
        instance = models.Feed.objects.get(pk=id)
        form = forms.FeedForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/feeds')
        else:
            return HttpResponseRedirect(f'/home/feeds/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.Feed.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'feed_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def eggs(request):
    if request.method == 'POST':
        form = forms.EggForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/eggs/')
        else:
            return HttpResponseRedirect('/home/eggs?error=true')
    else:
        return render(request, 'eggs.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def egg_edit(request, id=0):
    if request.method == 'POST':
        instance = models.Egg.objects.get(pk=id)
        form = forms.EggForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/eggs')
        else:
            return HttpResponseRedirect(f'/home/eggs/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.Egg.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'egg_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def flocks(request):
    if request.method == 'POST':
        form = forms.FlockForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/flocks/')
        else:
            return HttpResponseRedirect('/home/flocks?error=true')
    else:
        return render(request, 'flocks.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def flock_edit(request, id=0):
    if request.method == 'POST':
        instance = models.Flock.objects.get(pk=id)
        form = forms.FlockForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/flocks')
        else:
            return HttpResponseRedirect(f'/home/flocks/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.Flock.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'flock_edit.html', context=context)


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def weights(request):
    if request.method == 'POST':
        form = forms.WeightForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            return HttpResponseRedirect('/home/weights/')
        else:
            return HttpResponseRedirect('/home/weights?error=true')
    else:
        return render(request, 'weights.html')


@login_required(login_url='/login')
@require_http_methods(["GET", "POST"])
def weight_edit(request, id=0):
    if request.method == 'POST':
        instance = models.Weight.objects.get(pk=id)
        form = forms.WeightForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/home/weights')
        else:
            return HttpResponseRedirect(f'/home/weights/%s' % id)
    else:
        context = {}
        if id != 0:
            context['data'] = models.Weight.objects.get(pk=id)
        else:
            context['data'] = None
        return render(request, 'weight_edit.html', context=context)
