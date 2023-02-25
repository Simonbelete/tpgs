import io
import math
import pandas as pd
from decimal import Decimal
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound

from chickens.models import Chicken


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
