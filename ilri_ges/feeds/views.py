from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import FeedForm, FeedTypeForm
from .models import FeedType, Feed


class FeedsView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'feeds/index.html')


class FeedsCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = FeedForm
        return render(request, 'feeds/create.html', {'form': form})

    def post(self, request):
        form = FeedForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('feeds')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        return render(request, 'feeds/index.html')


class FeedsEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Feed.objects.get(pk=id)
            form = FeedForm(instance=data)
            return render(request, 'feeds/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Feed.objects.get(pk=id)
            form = FeedForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
            messages.success(request, 'Successfully Updated !')
            return render(request, 'feeds/edit.html', {'form': form})
        except Exception as ex:
            return redirect('500')

# Feed Type


class FeedTypesView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'feed_types/index.html')


class FeedTypesCreateView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = FeedTypeForm
        return render(request, 'feed_types/create.html', {'form': form})

    def post(self, request):
        form = FeedTypeForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.created_by = request.user
            form.save()
            if form is not None:
                return redirect('feed_types')
            else:
                messages.error(
                    request, 'Error occurred while creating, please check your data')
        return render(request, 'feed_types/index.html')


class FeedTypesEditView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = Feed.objects.get(pk=id)
            form = FeedForm(instance=data)
            return render(request, 'feed_types/edit.html', {'form': form, "id": id})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = FeedType.objects.get(pk=id)
            form = FeedTypeForm(request.POST, instance=data)
            if form.is_valid():
                form.save()
            messages.success(request, 'Successfully Updated !')
            return render(request, 'feed_types/edit.html', {'form': form})
        except Exception as ex:
            return redirect('500')
