from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

from users.models import User


class DashboardView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        context = {
            'statics_count': {
                'users_count': User.objects.count(),
                'flocks_count': 0,
                'farms_count': 0,
                'chicken_count': 0,
                'eggs_count': 0
            },
        }
        return render(request, 'dashboard/index.html', context=context)
