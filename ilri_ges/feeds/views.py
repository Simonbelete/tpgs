from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.db.models import Q
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

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
        week = request.GET.get('week', 0)
        chicken = request.GET.get('chicken', None)
        form = FeedForm(initial={'week': week, 'chicken': chicken})
        return render(request, 'feeds/create.html', {'form': form})

    def post(self, request):
        form = FeedForm(request.POST)
        if form.is_valid():
            record_feed = Feed.objects.filter(
                chicken=form.cleaned_data['chicken'], week=form.cleaned_data['week'])
            if record_feed.exists():
                previous_feed_links = ""
                for e in record_feed.iterator():
                    previous_feed_links += "<br><a href='/feeds/%s'> Tag: %s Week %s Click to View</a>" % (
                        e.id, e.chicken.tag, e.week)
                messages.error(
                    request, 'Error record for the given week %s already exists' % form.cleaned_data['week'] + previous_feed_links)
            else:
                form = form.save(commit=False)
                form.created_by = request.user
                form.save()
                if form is not None:
                    return redirect('feeds')
                else:
                    messages.error(
                        request, 'Error occurred while creating, please check your data')
        else:
            messages.error(request, 'Error please check your data')
        return render(request, 'feeds/create.html', {'form': form})


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
                record_feed = Feed.objects.filter(~Q(id=data.id),
                                                  chicken=form.cleaned_data['chicken'], week=form.cleaned_data['week'])
                if record_feed.exists():
                    previous_feed_links = ""
                    for e in record_feed.iterator():
                        previous_feed_links += "<br><a href='/feeds/%s'> Tag: %s Week %s Click to View</a>" % (
                            e.id, e.chicken.tag, e.week)
                    messages.error(
                        request, 'Error record for the given week %s already exists' % form.cleaned_data['week'] + previous_feed_links)
                else:
                    form.save()
                    return redirect('feeds')
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
                return redirect('feeds_types')
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
            data = FeedType.objects.get(pk=id)
            form = FeedTypeForm(instance=data)
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


class FeedsDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('feeds.delete_feed')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = Feed.objects.get(id=id)
            breed_pair.delete()
            return redirect('feeds')
        except:
            return redirect(500)


class FeedTypesDeleteView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('feeds.delete_feedtype')

    def post(self, request, id=0):
        if id == 0:
            return redirect(400)
        try:
            breed_pair = FeedType.objects.get(id=id)
            breed_pair.delete()
            return redirect('feeds_types')
        except:
            return redirect(500)
