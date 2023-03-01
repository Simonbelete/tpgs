import io
import math
import pandas as pd
from decimal import Decimal
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
from django.contrib.auth.mixins import LoginRequiredMixin

from chickens.models import Chicken


class ChickenView(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        return render(request, 'chickens/index.html')


class ChickenImportView(View):
    def get(self, request):
        return render(request, 'import/index.html')

    def post(self, request):
        errors = []
        file_upload = request.FILES.get('file_upload')
        df = pd.read_excel(file_upload, header=0)
        df.columns = df.columns.str.lower()

        for index, row in df.iterrows():
            print('---------------------------------')
            print(row['id'])
            print(index)
            chicken = Chicken.objects.update_or_create(tag=row['id'])

        return HttpResponse({
            'errors': errors,
        })
