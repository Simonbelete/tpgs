from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from users.models import User
from flocks.models import Flock
from farms.models import Farm
from chickens.models import Chicken
from eggs.models import Egg


class DashboardView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        # hatch_date =
        # today =

        # days = hd - td
        # age_in_weeks =
        # if (chicken.age_weeks)

        # chickens = Chicken.objects.all().exclude(hatch_date=None)

        # for chicken in chickens:
        #     chicken_current_week = chicken.age_in_weeks
        if request.user.is_superuser:
            context = {
                'statics_count': {
                    'users_count': User.objects.filter(is_superuser=False).count(),
                    'flocks_count': Flock.objects.count(),
                    'farms_count': Farm.objects.count(),
                    'chicken_count': Chicken.objects.count(),
                },
            }
        else:
            farms = request.user.farms.all()
            context = {
                'statics_count': {
                    'users_count': User.objects.filter(farms__in=farms, is_superuser=False).count(),
                    'flocks_count': Flock.objects.filter(farm__in=farms).count(),
                    'farms_count': farms.count(),
                    'chicken_count': Chicken.objects.filter(farm__in=farms).count(),
                },
            }
        return render(request, 'dashboard/index.html', context=context)


class DashboardPedigreeView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'pedigree/index.html')


class DashboardPedigreeFullScreenView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'pedigree/full_screen.html')


class AnalysisAnomalyWeight(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'analysis/anomaly_feed.html')


class AnalysisAnomalyFeed(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'analysis/anomaly_feed.html')


class AnalysisAnomalyEgg(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'analysis/anomaly_egg.html')
