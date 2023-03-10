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
        context = {
            'statics_count': {
                'users_count': User.objects.count(),
                'flocks_count': Flock.objects.count(),
                'farms_count': Farm.objects.count(),
                'chicken_count': Chicken.objects.count(),
                'eggs_count': Egg.objects.count()
            },
        }
        return render(request, 'dashboard/index.html', context=context)


class DashboardPedigreeView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'pedigree/index.html')
